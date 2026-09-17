terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
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
      "codeartifact:PublishPackageVersion",
      "codeartifact:PutPackageMetadata",
    ]
    resources = [var.codeartifact_repository_arn]
  }
}

resource "aws_iam_role_policy" "publisher" {
  name   = "codeartifact-publish"
  role   = aws_iam_role.publisher.id
  policy = data.aws_iam_policy_document.publisher_permissions.json
}

# Reader role: used by ci.yml (install/build/test) and by developers assuming it locally.
resource "aws_iam_role" "reader" {
  name               = "${var.name_prefix}-codeartifact-reader-${var.environment}"
  assume_role_policy = data.aws_iam_policy_document.github_trust.json
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
      "codeartifact:ReadFromRepository",
      "codeartifact:GetRepositoryEndpoint",
      "codeartifact:DescribeRepository",
      "codeartifact:ListPackages",
      "codeartifact:ListPackageVersions",
    ]
    resources = [var.codeartifact_repository_arn]
  }
}

resource "aws_iam_role_policy" "reader" {
  name   = "codeartifact-read"
  role   = aws_iam_role.reader.id
  policy = data.aws_iam_policy_document.reader_permissions.json
}
