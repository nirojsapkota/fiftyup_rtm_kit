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
  github_ref_condition = "ref:refs/heads/*"

  # dev is the first environment applied: it owns the account-wide/shared resources.
  create_oidc_provider           = true
  create_shared_domain_resources = true

  # No Route53 hosted zone is used for dev: the ACM cert validation CNAME and the custom
  # domain's target must be added manually to whatever DNS provider manages fiftyupclub.com.
  # After apply, check `terraform output dns_certificate_validation_records` and
  # `terraform output dns_domain_target` for what to add.
  manage_dns_records = false
}

