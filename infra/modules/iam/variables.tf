variable "name_prefix" {
  description = "Prefix for IAM role names, e.g. rtm-kit"
  type        = string
}

variable "environment" {
  description = "Environment name, e.g. dev or prod"
  type        = string
}

variable "github_repo" {
  description = "GitHub repo allowed to assume these roles via OIDC, e.g. FIFTYUPCLUBAU/rtm-kit"
  type        = string
}

variable "github_ref_condition" {
  description = "OIDC sub condition suffix restricting which branch/environment may assume the role, e.g. ref:refs/heads/master or environment:prod"
  type        = string
  default     = "*"
}

variable "create_oidc_provider" {
  description = "Whether to create the account-wide GitHub OIDC provider (set true only once per AWS account)"
  type        = bool
  default     = false
}

variable "codeartifact_domain_arn" {
  description = "ARN of the CodeArtifact domain these roles need domain-level permissions on"
  type        = string
}

variable "codeartifact_repository_arn" {
  description = "ARN of the CodeArtifact repository these roles need repository-level permissions on"
  type        = string
}
