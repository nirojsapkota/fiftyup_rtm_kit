variable "name_prefix" {
  description = "Prefix for resource names, e.g. rtm-kit"
  type        = string
}

variable "environment" {
  description = "Environment name used as the base path mapping key, e.g. dev or prod"
  type        = string
}

variable "domain_name" {
  description = "Custom domain for the registry, e.g. repo.fiftyupclub.com"
  type        = string
}

variable "route53_zone_id" {
  description = "Route53 hosted zone id for the base domain (e.g. fiftyupclub.com). Only required when manage_dns_records is true."
  type        = string
  default     = ""
}

variable "codeartifact_repository_endpoint" {
  description = "npm-protocol endpoint of the CodeArtifact repository this environment proxies to"
  type        = string
}

variable "create_certificate" {
  description = "Whether this module instance creates the shared ACM certificate (only one environment should set this true)"
  type        = bool
  default     = false
}

variable "create_domain" {
  description = "Whether this module instance creates the shared API Gateway custom domain name (only one environment should set this true)"
  type        = bool
  default     = false
}

variable "manage_dns_records" {
  description = "Whether Terraform manages Route53 records for the ACM cert validation and the custom domain alias. Set false to only create the ACM certificate + API Gateway custom domain name and manage DNS (validation CNAME + ALIAS/CNAME to the API Gateway target) manually/elsewhere - see the certificate_validation_records and domain_target outputs."
  type        = bool
  default     = true
}
