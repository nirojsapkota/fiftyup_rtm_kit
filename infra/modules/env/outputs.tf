output "registry_url" {
  description = "npm registry URL for this environment (use in .npmrc)"
  value       = module.api_proxy.registry_url
}

output "codeartifact_domain_name" {
  value = module.codeartifact.domain_name
}

output "codeartifact_repository_name" {
  value = module.codeartifact.repository_name
}

output "publisher_role_arn" {
  description = "IAM role ARN assumed by GitHub Actions to publish packages (set as AWS_ROLE_ARN in publish workflow)"
  value       = module.iam.publisher_role_arn
}

output "reader_role_arn" {
  description = "IAM role ARN assumed by GitHub Actions for install/test (set as AWS_ROLE_ARN in ci workflow)"
  value       = module.iam.reader_role_arn
}

output "dns_certificate_validation_records" {
  description = "DNS CNAME records to create manually when manage_dns_records is false, so the ACM cert can validate."
  value       = module.api_proxy.certificate_validation_records
}

output "dns_domain_target" {
  description = "API Gateway regional target to point the custom domain at manually when manage_dns_records is false."
  value       = module.api_proxy.domain_target
}
