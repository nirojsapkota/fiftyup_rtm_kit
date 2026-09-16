output "registry_url" {
  value = module.env.registry_url
}

output "publisher_role_arn" {
  value = module.env.publisher_role_arn
}

output "reader_role_arn" {
  value = module.env.reader_role_arn
}

output "dns_certificate_validation_records" {
  description = "Add these CNAME record(s) manually to whatever DNS provider manages fiftyupclub.com so the ACM cert can validate."
  value       = module.env.dns_certificate_validation_records
}

output "dns_domain_target" {
  description = "Point repo.fiftyupclub.com (CNAME/ALIAS) at this API Gateway target manually."
  value       = module.env.dns_domain_target
}
