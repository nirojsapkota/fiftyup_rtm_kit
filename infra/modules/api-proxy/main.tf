terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

# ACM certificate for the shared custom domain (repo.fiftyupclub.com). Only one environment's
# module instance should create this (var.create_certificate), the other environment reuses the
# ARN via var.existing_certificate_arn, since API Gateway custom domain names are one-per-domain
# and base-path-mapped per environment (…/dev, …/prod). Entirely skipped when
# var.enable_custom_domain is false (e.g. no real domain/hosted zone available yet) - the raw
# API Gateway invoke URL is used instead (see registry_url output).
resource "aws_acm_certificate" "this" {
  count             = (var.enable_custom_domain && var.create_certificate) ? 1 : 0
  domain_name       = var.domain_name
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  for_each = (var.enable_custom_domain && var.create_certificate && var.manage_dns_records) ? {
    for dvo in aws_acm_certificate.this[0].domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  } : {}

  zone_id = var.route53_zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 300
  records = [each.value.record]
}

resource "aws_acm_certificate_validation" "this" {
  count                   = (var.enable_custom_domain && var.create_certificate && var.manage_dns_records) ? 1 : 0
  certificate_arn         = aws_acm_certificate.this[0].arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}

# Looked up rather than passed as a tfvar so the "prod" environment (a separate Terraform
# state from "dev", which creates the certificate) can resolve it without cross-state wiring.
data "aws_acm_certificate" "existing" {
  count       = (var.enable_custom_domain && !var.create_certificate) ? 1 : 0
  domain      = var.domain_name
  statuses    = ["ISSUED"]
  most_recent = true
}

locals {
  certificate_arn = var.create_certificate ? try(aws_acm_certificate.this[0].arn, null) : try(data.aws_acm_certificate.existing[0].arn, null)
}

# One shared custom domain name across environments; base path mappings ("dev"/"prod") route
# to each environment's own HTTP API + stage, giving URLs like
# https://repo.fiftyupclub.com/dev/ and https://repo.fiftyupclub.com/prod/ matching codebox-npm's
# original /dev/registry and /prod/registry URL shape.
resource "aws_apigatewayv2_domain_name" "this" {
  count       = (var.enable_custom_domain && var.create_domain) ? 1 : 0
  domain_name = var.domain_name

  domain_name_configuration {
    certificate_arn = local.certificate_arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }

  depends_on = [aws_acm_certificate_validation.this]
}

resource "aws_route53_record" "api" {
  count   = (var.enable_custom_domain && var.create_domain && var.manage_dns_records) ? 1 : 0
  zone_id = var.route53_zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_apigatewayv2_domain_name.this[0].domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.this[0].domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}

# HTTP API acting as a pure reverse proxy: no Lambda/application code, just an HTTP_PROXY
# integration forwarding every request (path + headers, including Authorization) to the
# CodeArtifact repository's npm endpoint for this environment.
resource "aws_apigatewayv2_api" "this" {
  name          = "${var.name_prefix}-registry-proxy-${var.environment}"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "codeartifact" {
  api_id                 = aws_apigatewayv2_api.this.id
  integration_type       = "HTTP_PROXY"
  integration_method     = "ANY"
  integration_uri        = "${var.codeartifact_repository_endpoint}{proxy}"
  payload_format_version = "1.0"
}

resource "aws_apigatewayv2_route" "proxy" {
  api_id    = aws_apigatewayv2_api.this.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.codeartifact.id}"
}

resource "aws_apigatewayv2_stage" "this" {
  api_id      = aws_apigatewayv2_api.this.id
  name        = "$default"
  auto_deploy = true
}

resource "aws_apigatewayv2_api_mapping" "this" {
  count           = var.enable_custom_domain ? 1 : 0
  api_id          = aws_apigatewayv2_api.this.id
  domain_name     = var.domain_name
  stage           = aws_apigatewayv2_stage.this.id
  api_mapping_key = var.environment

  depends_on = [aws_apigatewayv2_domain_name.this]
}
