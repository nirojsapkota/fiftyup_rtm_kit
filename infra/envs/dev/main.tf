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

  environment          = "dev"
  route53_zone_id      = var.route53_zone_id
  github_ref_condition = "ref:refs/heads/*"

  # dev is the first environment applied: it owns the account-wide/shared resources.
  create_oidc_provider           = true
  create_shared_domain_resources = true

  # A Route53 hosted zone exists in this AWS account (a delegated zone for
  # fiftyupclub.com, or a zone for whatever subdomain is used) - Terraform fully
  # automates cert validation + the domain alias record via route53_zone_id.
  manage_dns_records = true
}


