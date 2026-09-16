terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }

  backend "s3" {
    bucket         = "rtm-kit-terraform-state"
    key            = "registry/prod/terraform.tfstate"
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

  environment          = "prod"
  route53_zone_id      = var.route53_zone_id
  github_ref_condition = "ref:refs/heads/master"

  # prod reuses the OIDC provider, ACM cert, and custom domain created by the dev environment.
  # Apply dev before prod.
  create_oidc_provider           = false
  create_shared_domain_resources = false
}
