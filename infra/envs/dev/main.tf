terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }

  # Update bucket/table names once the shared Terraform state bucket + lock table are
  # confirmed/created for this AWS account (see infra/README.md bootstrap notes).
  backend "s3" {
    bucket         = "rtm-kit-terraform-state"
    key            = "registry/dev/terraform.tfstate"
    region         = "ap-southeast-2"
    dynamodb_table = "rtm-kit-terraform-locks"
    encrypt        = true
  }
}

provider "aws" {
  region = "ap-southeast-2"
}

module "env" {
  source = "../../modules/env"

  environment     = "dev"
  route53_zone_id = var.route53_zone_id
  github_repo     = var.github_repo
  # "*" (not just "ref:refs/heads/*") because ci.yml also runs on pull_request events, whose
  # OIDC sub claim is "repo:<repo>:pull_request", not a ref/heads path. Dev is fine trusting
  # any event from the configured repo; prod stays restricted to pushes to master.
  github_ref_condition = "*"

  # dev is the first environment applied: it owns the account-wide/shared resources.
  create_oidc_provider           = true
  create_shared_domain_resources = true
  manage_dns_records             = true

  # This AWS account's Route53 hosted zone (niroj.rtmkit) is not the real fiftyupclub.com
  # domain, so ACM DNS validation for repo.fiftyupclub.com can never succeed here. Disable
  # the custom domain entirely for now; the registry is reachable via the raw API Gateway
  # invoke URL (see the registry_url output). Flip to true once a real domain + matching
  # Route53 hosted zone are available.
  enable_custom_domain = false
}


