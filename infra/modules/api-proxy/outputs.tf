output "registry_url" {
  description = "Public URL developers/CI use as the npm registry for this environment. Falls back to the raw API Gateway invoke URL when enable_custom_domain is false."
  value       = var.enable_custom_domain ? "https://${var.domain_name}/${var.environment}/" : aws_apigatewayv2_stage.this.invoke_url
}

output "certificate_arn" {
  value = local.certificate_arn
}

output "api_id" {
  value = aws_apigatewayv2_api.this.id
}

output "certificate_validation_records" {
  description = "DNS CNAME records to create manually (when manage_dns_records = false) so the ACM certificate can validate and reach ISSUED status."
  value = (var.enable_custom_domain && var.create_certificate) ? {
    for dvo in aws_acm_certificate.this[0].domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  } : {}
}

output "domain_target" {
  description = "API Gateway regional target to point the custom domain at manually (when manage_dns_records = false), e.g. a CNAME/ALIAS from repo.fiftyupclub.com to this target."
  value = (var.enable_custom_domain && var.create_domain) ? {
    target_domain_name = aws_apigatewayv2_domain_name.this[0].domain_name_configuration[0].target_domain_name
    hosted_zone_id     = aws_apigatewayv2_domain_name.this[0].domain_name_configuration[0].hosted_zone_id
  } : null
}
