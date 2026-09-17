variable "route53_zone_id" {
  description = "Route53 hosted zone id (in this AWS account) that will hold the DNS records for the registry custom domain. Only required while enable_custom_domain = true in main.tf."
  type        = string
  default     = ""
}

variable "github_repo" {
  description = "GitHub repo (owner/name) allowed to assume the dev IAM roles via OIDC. Must match whatever repo the dev GitHub Actions workflows actually run in."
  type        = string
  default     = "FIFTYUPCLUBAU/rtm-kit"
}
