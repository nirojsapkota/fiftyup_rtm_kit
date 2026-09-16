variable "route53_zone_id" {
  description = "Route53 hosted zone id (in this AWS account) that will hold the DNS records for the registry custom domain. Only required while enable_custom_domain = true in main.tf."
  type        = string
  default     = ""
}
