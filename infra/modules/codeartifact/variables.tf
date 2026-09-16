variable "domain_name" {
  description = "CodeArtifact domain name (shared across environments), e.g. rtm-kit"
  type        = string
}

variable "environment" {
  description = "Environment name, e.g. dev or prod"
  type        = string
}

variable "allowed_principal_arns" {
  description = "IAM role/user ARNs allowed to read from and publish to this environment's repository (publisher + reader roles)"
  type        = list(string)
}
