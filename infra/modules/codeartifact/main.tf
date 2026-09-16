terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

# Single CodeArtifact domain shared across environments; each environment gets its own
# repository so package versions/publishing permissions can be scoped independently
# (mirrors the dev/prod split codebox-npm exposed as /dev/registry and /prod/registry).
resource "aws_codeartifact_domain" "this" {
  domain = var.domain_name
}

# Upstream repository proxying public npmjs.org. CodeArtifact repositories can only have
# an "external connection" OR upstream repositories, not both directly on the same repo used
# for publishing, so we model the npmjs fallback as a dedicated upstream repository that the
# environment repository points to. This replicates codebox-npm's CODEBOX_REGISTRY fallback:
# any package not published under our own scope falls through to public npm.
resource "aws_codeartifact_repository" "npmjs_upstream" {
  repository = "${var.domain_name}-npmjs-upstream"
  domain     = aws_codeartifact_domain.this.domain

  external_connections {
    external_connection_name = "public:npmjs"
  }
}

resource "aws_codeartifact_repository" "env" {
  repository  = "${var.domain_name}-${var.environment}"
  domain      = aws_codeartifact_domain.this.domain
  description = "rtm-kit private npm registry (${var.environment}) - replaces codebox-npm"

  upstream {
    repository_name = aws_codeartifact_repository.npmjs_upstream.repository
  }
}

# Resource policy allowing the publisher/reader IAM roles to interact with this environment's
# repository. Domain-level GetAuthorizationToken permission is granted separately via IAM policy
# (aws_codeartifact_domain does not require a resource policy for that action).
data "aws_iam_policy_document" "repo_access" {
  statement {
    sid    = "AllowPublisherAndReaderPrincipals"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = var.allowed_principal_arns
    }
    actions = [
      "codeartifact:ReadFromRepository",
      "codeartifact:GetRepositoryEndpoint",
      "codeartifact:DescribePackageVersion",
      "codeartifact:DescribeRepository",
      "codeartifact:GetPackageVersionReadme",
      "codeartifact:ListPackages",
      "codeartifact:ListPackageVersions",
      "codeartifact:PublishPackageVersion",
      "codeartifact:PutPackageMetadata",
    ]
    resources = [aws_codeartifact_repository.env.arn]
  }
}

resource "aws_codeartifact_repository_permissions_policy" "env" {
  repository      = aws_codeartifact_repository.env.repository
  domain          = aws_codeartifact_domain.this.domain
  policy_document = data.aws_iam_policy_document.repo_access.json
}

# Resolves the npm-protocol endpoint for this repository, used as the origin for the
# API Gateway reverse proxy (e.g. https://<domain>-<account>.d.codeartifact.<region>.amazonaws.com/npm/<repo>/).
data "aws_codeartifact_repository_endpoint" "env" {
  domain     = aws_codeartifact_domain.this.domain
  repository = aws_codeartifact_repository.env.repository
  format     = "npm"
}
