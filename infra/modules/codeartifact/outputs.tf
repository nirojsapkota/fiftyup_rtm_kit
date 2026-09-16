output "domain_name" {
  value = aws_codeartifact_domain.this.domain
}

output "domain_arn" {
  value = aws_codeartifact_domain.this.arn
}

output "domain_owner" {
  value = aws_codeartifact_domain.this.owner
}

output "repository_name" {
  value = aws_codeartifact_repository.env.repository
}

output "repository_arn" {
  value = aws_codeartifact_repository.env.arn
}

output "repository_endpoint" {
  description = "npm-protocol endpoint for this repository, used as the API Gateway proxy origin"
  value       = data.aws_codeartifact_repository_endpoint.env.repository_endpoint
}
