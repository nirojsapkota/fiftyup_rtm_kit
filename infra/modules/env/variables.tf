variable "aws_region" {
  type    = string
  default = "ap-southeast-2"
}

variable "name_prefix" {
  description = "Prefix for resource names, e.g. rtm-kit"
  type        = string
  default     = "rtm-kit"
}

variable "environment" {
  description = "Environment name: dev or prod"
  type        = string
}

variable "codeartifact_domain_name" {
  description = "Shared CodeArtifact domain name across environments"
  type        = string
  default     = "rtm-kit"
}

variable "registry_domain_name" {
  description = "Custom domain for the registry, e.g. repo.fiftyupclub.com"
  type        = string
  default     = "repo.fiftyupclub.com"
}

variable "route53_zone_id" {
  description = "Route53 hosted zone id for fiftyupclub.com. Only required when manage_dns_records is true."
  type        = string
  default     = ""
}

variable "github_repo" {
  description = "GitHub repo allowed to assume the IAM roles via OIDC, e.g. FIFTYUPCLUBAU/rtm-kit"
  type        = string
  default     = "FIFTYUPCLUBAU/rtm-kit"
}

variable "github_ref_condition" {
  description = "OIDC sub condition suffix restricting which branch may assume the role, e.g. ref:refs/heads/master"
  type        = string
}

variable "create_oidc_provider" {
  description = "Whether this environment creates the account-wide GitHub OIDC provider (set true for exactly one environment, typically dev, applied first)"
  type        = bool
  default     = false
}

variable "create_shared_domain_resources" {
  description = "Whether this environment creates the shared ACM cert + API Gateway custom domain name (set true for exactly one environment, typically dev, applied first)"
  type        = bool
  default     = false
}

variable "manage_dns_records" {
  description = "Whether Terraform manages Route53 records for cert validation + the domain alias. Set false to manage DNS manually/elsewhere instead (see module.api_proxy outputs certificate_validation_records/domain_target)."
  type        = bool
  default     = true
}

variable "enable_custom_domain" {
  description = "Whether to provision the ACM cert + API Gateway custom domain at all. Set false when no real domain/hosted zone is available yet - the registry falls back to the raw API Gateway invoke URL."
  type        = bool
  default     = true
}
