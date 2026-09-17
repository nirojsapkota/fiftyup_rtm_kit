terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

data "aws_region" "current" {}

# CodeArtifact's PublishPackageVersion/PutPackageMetadata actions are authorized against
# package-level ARNs (arn:...:package/domain/repo/format/namespace/name), not the
# repository ARN - a repository-scoped policy alone always 403s on these actions.
locals {
  codeartifact_package_arn_pattern = "arn:aws:codeartifact:${data.aws_region.current.region}:${var.codeartifact_domain_owner}:package/${var.codeartifact_domain_name}/${var.codeartifact_repository_name}/npm/*"
}

# GitHub's OIDC provider thumbprint/URL is stable and account-wide; only create it once
# (guard with var.create_oidc_provider so a second environment/module instance can reuse it).
resource "aws_iam_openid_connect_provider" "github" {
  count = var.create_oidc_provider ? 1 : 0

  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}

locals {
  oidc_provider_arn = var.create_oidc_provider ? aws_iam_openid_connect_provider.github[0].arn : "arn:aws:iam::${data.aws_caller_identity.current.account_id}:oidc-provider/token.actions.githubusercontent.com"
}

data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "github_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [local.oidc_provider_arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    # GitHub's OIDC "sub" claim can appear in two shapes depending on the repo/owner's
    # rename history: the classic "repo:owner/repo:<ref-condition>" form, or a newer
    # immutable-ID-embedded form "repo:owner@<owner-id>/repo@<repo-id>:<ref-condition>"
    # (added by GitHub to stop trust hijacking after a rename). Match both so this doesn't
    # silently break with "Not authorized to perform sts:AssumeRoleWithWebIdentity".
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values = [
        "repo:${var.github_repo}:${var.github_ref_condition}",
        "repo:${split("/", var.github_repo)[0]}@*/${split("/", var.github_repo)[1]}@*:${var.github_ref_condition}",
      ]
    }
  }
}

# Publisher role: used by publish-dev.yml / publish-prod.yml to push package versions.
resource "aws_iam_role" "publisher" {
  name               = "${var.name_prefix}-codeartifact-publisher-${var.environment}"
  assume_role_policy = data.aws_iam_policy_document.github_trust.json
}

data "aws_iam_policy_document" "publisher_permissions" {
  statement {
    sid    = "CodeArtifactAuth"
    effect = "Allow"
    actions = [
      "codeartifact:GetAuthorizationToken",
      "sts:GetServiceBearerToken",
    ]
    resources = ["*"]
  }

  statement {
    sid    = "CodeArtifactDomainRead"
    effect = "Allow"
    actions = [
      "codeartifact:GetDomainPermissionsPolicy",
      "codeartifact:ListRepositoriesInDomain",
      "codeartifact:DescribeDomain",
    ]
    resources = [var.codeartifact_domain_arn]
  }

  statement {
    sid    = "CodeArtifactPublish"
    effect = "Allow"
    actions = [
      "codeartifact:ReadFromRepository",
      "codeartifact:GetRepositoryEndpoint",
    ]
    resources = [var.codeartifact_repository_arn]
  }

  statement {
    sid    = "CodeArtifactPublishPackage"
    effect = "Allow"
    actions = [
      "codeartifact:PublishPackageVersion",
      "codeartifact:PutPackageMetadata",
    ]
    resources = [local.codeartifact_package_arn_pattern]
  }
}

resource "aws_iam_role_policy" "publisher" {
  name   = "codeartifact-publish"
  role   = aws_iam_role.publisher.id
  policy = data.aws_iam_policy_document.publisher_permissions.json
}

# Reader role: used by ci.yml (install/build/test) and by developers assuming it locally.
# In addition to GitHub OIDC (CI), also trust same-account IAM principals so a developer (or
# another project, e.g. rtm-offer-spa) can `aws sts assume-role` into it locally to run
# `aws codeartifact login`. This requires the calling principal to separately have
# sts:AssumeRole permission on this role's ARN granted via their own IAM identity policy -
# this trust statement alone does not grant anyone access.
data "aws_iam_policy_document" "reader_trust" {
  source_policy_documents = [data.aws_iam_policy_document.github_trust.json]

  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
    }
  }
}

resource "aws_iam_role" "reader" {
  name               = "${var.name_prefix}-codeartifact-reader-${var.environment}"
  assume_role_policy = data.aws_iam_policy_document.reader_trust.json
}

data "aws_iam_policy_document" "reader_permissions" {
  statement {
    sid    = "CodeArtifactAuth"
    effect = "Allow"
    actions = [
      "codeartifact:GetAuthorizationToken",
      "sts:GetServiceBearerToken",
    ]
    resources = ["*"]
  }

  statement {
    sid    = "CodeArtifactRead"
    effect = "Allow"
    actions = [
      "codeartifact:GetRepositoryEndpoint",
      "codeartifact:DescribeRepository",
    ]
    resources = [var.codeartifact_repository_arn]
  }

  # As with PublishPackageVersion/PutPackageMetadata on the publisher role, in practice
  # CodeArtifact authorizes these read/list actions against the package-level ARN, not the
  # repository ARN alone - a repository-scoped policy for these specific actions 403s.
  statement {
    sid    = "CodeArtifactReadPackages"
    effect = "Allow"
    actions = [
      "codeartifact:ReadFromRepository",
      "codeartifact:ListPackages",
      "codeartifact:ListPackageVersions",
    ]
    resources = [local.codeartifact_package_arn_pattern]
  }
}

resource "aws_iam_role_policy" "reader" {
  name   = "codeartifact-read"
  role   = aws_iam_role.reader.id
  policy = data.aws_iam_policy_document.reader_permissions.json
}
