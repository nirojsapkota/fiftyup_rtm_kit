terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

module "codeartifact" {
  source = "../codeartifact"

  domain_name = var.codeartifact_domain_name
  environment = var.environment
  allowed_principal_arns = [
    module.iam.publisher_role_arn,
    module.iam.reader_role_arn,
  ]
}

module "iam" {
  source = "../iam"

  name_prefix                  = var.name_prefix
  environment                  = var.environment
  github_repo                  = var.github_repo
  github_ref_condition         = var.github_ref_condition
  create_oidc_provider         = var.create_oidc_provider
  codeartifact_domain_arn      = module.codeartifact.domain_arn
  codeartifact_repository_arn  = module.codeartifact.repository_arn
  codeartifact_domain_name     = module.codeartifact.domain_name
  codeartifact_domain_owner    = module.codeartifact.domain_owner
  codeartifact_repository_name = module.codeartifact.repository_name
}

module "api_proxy" {
  source = "../api-proxy"

  name_prefix                      = var.name_prefix
  environment                      = var.environment
  domain_name                      = var.registry_domain_name
  route53_zone_id                  = var.route53_zone_id
  codeartifact_repository_endpoint = module.codeartifact.repository_endpoint
  create_certificate               = var.create_shared_domain_resources
  create_domain                    = var.create_shared_domain_resources
  manage_dns_records               = var.manage_dns_records
  enable_custom_domain             = var.enable_custom_domain
}
