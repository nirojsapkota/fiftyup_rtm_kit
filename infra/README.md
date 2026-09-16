# rtm-kit registry infra (AWS CodeArtifact + Terraform)

Replaces the legacy `codebox-npm` (Serverless/Lambda) private npm registry with an AWS-native,
minimal-code equivalent:

- **AWS CodeArtifact** (`rtm-kit` domain, one repository per environment: `rtm-kit-dev`,
  `rtm-kit-prod`), each with an upstream connection that falls back to public npmjs.org for any
  package that isn't `@rtm-ui`/`@rtm` scoped — matching codebox-npm's original behavior.
- **API Gateway HTTP API** acting as a pure reverse proxy (`ANY /{proxy+}` → `HTTP_PROXY`
  integration) in front of each CodeArtifact repository's npm endpoint, purely so the registry
  keeps a friendly custom domain (`https://repo.fiftyupclub.com/{dev,prod}/`) instead of the raw
  CodeArtifact endpoint. No Lambda/application code involved.
- **IAM** (via GitHub OIDC) instead of GitHub-OAuth — no OAuth app, no custom authorizer. Two
  roles per environment: `*-codeartifact-publisher-*` (used by CI to `lerna publish`) and
  `*-codeartifact-reader-*` (used by CI to install `@rtm-ui` deps).

## Layout

- `bootstrap/` – one-off, local-state config that creates the S3 bucket + DynamoDB table used as
  the remote backend for `envs/dev` and `envs/prod`. Apply this exactly once, before anything else.
- `modules/codeartifact` – CodeArtifact domain + per-environment repository + upstream + policy.
- `modules/iam` – GitHub OIDC provider + publisher/reader IAM roles.
- `modules/api-proxy` – ACM cert, Route53 record, API Gateway custom domain + HTTP proxy.
- `modules/env` – composes the three modules above for one environment.
- `envs/dev`, `envs/prod` – the two deployable root configs (S3 backend, calls `modules/env`).
  `dev` is applied first and owns the account-wide/shared resources (GitHub OIDC provider, ACM
  certificate, API Gateway custom domain name); `prod` looks those up instead of recreating them.

## DNS: fully automated via Route53 (both environments)

Both `dev` and `prod` set `manage_dns_records = true` (default), so Terraform creates the ACM
certificate, validates it, creates the API Gateway custom domain name, and creates the Route53
alias/CNAME records automatically — you just need to supply `route53_zone_id`. This works even
when the AWS account doesn't own the `fiftyupclub.com` apex domain, as long as a Route53 hosted
zone (e.g. a delegated subdomain zone) exists in that account for `terraform apply` to write
records into.

## First-time setup

```sh
cd infra/bootstrap
terraform init
terraform apply   # creates the S3 state bucket + DynamoDB lock table

cd ../envs/dev
cp terraform.tfvars.example terraform.tfvars   # fill in route53_zone_id
terraform init
terraform apply

cd ../prod
cp terraform.tfvars.example terraform.tfvars   # fill in route53_zone_id
terraform init
terraform apply
```

## Outputs consumed by CI

`terraform output` from each environment provides:
- `registry_url` – set as the `registry`/`@rtm-ui:registry` value in `.npmrc`.
- `publisher_role_arn` / `reader_role_arn` – set as the `role-to-assume` input for the
  `aws-actions/configure-aws-credentials` step in the corresponding GitHub Actions workflow.

## Assumptions to confirm before applying

- Target AWS account/region (`ap-southeast-2` used as the default, matching the existing
  CodeBuild badge in `README.md`).
- A Route53 hosted zone already exists in the target account for whichever domain/subdomain is
  used for the registry (the account does not need to own the `fiftyupclub.com` apex domain —
  a delegated zone is enough).
- No pre-existing GitHub OIDC provider or Terraform state bucket with the same names in the
  account (the config assumes a clean slate; adjust `create_oidc_provider` in `envs/dev/main.tf`
  and `bootstrap` bucket/table names otherwise).
