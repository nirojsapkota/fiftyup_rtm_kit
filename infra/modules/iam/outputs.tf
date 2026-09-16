output "publisher_role_arn" {
  value = aws_iam_role.publisher.arn
}

output "reader_role_arn" {
  value = aws_iam_role.reader.arn
}

output "oidc_provider_arn" {
  value = local.oidc_provider_arn
}
