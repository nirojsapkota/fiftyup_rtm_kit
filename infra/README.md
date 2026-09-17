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
- `modules/api-proxy` – ACM cert, Route53 record, API Gateway custom domain + HTTP proxy
  (custom domain/ACM layer is toggleable via `enable_custom_domain`; see DNS section below).
- `modules/env` – composes the three modules above for one environment.
- `envs/dev`, `envs/prod` – the two deployable root configs (S3 backend, calls `modules/env`).
  `dev` is applied first and owns the account-wide/shared resources (GitHub OIDC provider, ACM
  certificate, API Gateway custom domain name); `prod` looks those up instead of recreating them.

## DNS / custom domain

The `enable_custom_domain` variable (in `modules/api-proxy`, wired through `modules/env`)
controls whether the ACM cert + API Gateway custom domain name are provisioned at all:

- **`enable_custom_domain = true`** (the goal for a real deployment): also requires
  `manage_dns_records = true` + a correct `route53_zone_id` that is **actually authoritative**
  for the domain you set as `registry_domain_name` (`repo.fiftyupclub.com` by default). Terraform
  then creates the ACM cert, validates it via a Route53 CNAME, creates the API Gateway custom
  domain name, and creates the alias record — giving you `https://repo.fiftyupclub.com/{dev,prod}/`.
- **`enable_custom_domain = false`**: skips the ACM cert + custom domain entirely. The registry
  is reachable via the raw API Gateway invoke URL instead (see the `registry_url` output, e.g.
  `https://<api-id>.execute-api.<region>.amazonaws.com/`). Use this when no real domain/hosted
  zone is available yet.

**`envs/dev` currently has `enable_custom_domain = false`** — deployed and verified working (see
below) — because the Route53 hosted zone available in the current sandbox AWS account
(`niroj.rtmkit`) is not the real `fiftyupclub.com` domain and cannot authoritatively serve DNS for
it, so ACM DNS validation for `repo.fiftyupclub.com` can never succeed there. Flip
`enable_custom_domain` back to `true` in `infra/envs/dev/main.tf` once a real domain (or a
correctly-delegated subdomain) with a matching Route53 hosted zone is available, and re-apply.

### ⚠️ Gotcha: Route53 silently appends the zone's own domain to record names

If you pass a `route53_zone_id` whose zone name does **not** match (or is not a parent of) the
`registry_domain_name` you're validating, Route53 does **not** error — it silently creates the
record with the zone's domain appended, e.g. requesting
`_hash.repo.fiftyupclub.com` in a zone named `niroj.rtmkit` actually creates
`_hash.repo.fiftyupclub.com.niroj.rtmkit`, which ACM can never see over the public internet.
This surfaces later as a confusing `missing <domain> DNS validation record: <hash>...` error from
`aws_acm_certificate_validation`, or the cert getting stuck in `PENDING_VALIDATION` forever.
**Always confirm the hosted zone you point `route53_zone_id` at is genuinely authoritative for
`registry_domain_name`** (`dig NS <registry_domain_name>` should show the zone's name servers)
before relying on `enable_custom_domain = true`.

## First-time setup

```sh
cd infra/bootstrap
terraform init
terraform apply   # creates the S3 state bucket + DynamoDB lock table

cd ../envs/dev
terraform init
terraform apply   # enable_custom_domain=false here today - see DNS section above.
                   # No terraform.tfvars/route53_zone_id needed while that stays false.

cd ../prod
cp terraform.tfvars.example terraform.tfvars   # fill in route53_zone_id
terraform init
terraform apply
```

### Deploying into a real (non-sandbox) AWS account

1. Confirm the target AWS account has a Route53 hosted zone that's actually authoritative for
   the domain you intend to use (see the gotcha above) — either the `fiftyupclub.com` apex or a
   properly NS-delegated subdomain.
2. In `infra/envs/dev/main.tf`, set `enable_custom_domain = true`.
3. `cp infra/envs/dev/terraform.tfvars.example infra/envs/dev/terraform.tfvars` and fill in that
   zone's id.
4. `terraform apply` — expect the ACM certificate to sit in `PENDING_VALIDATION` only very
   briefly (seconds) since the CNAME is created by the same apply, in the same authoritative
   zone; `aws_acm_certificate_validation` then blocks until AWS reports `ISSUED`.
5. Repeat steps 2–4 conceptually for `prod` (it already defaults to `enable_custom_domain = true`
   / `manage_dns_records = true`, reusing the cert/domain `dev` created).
6. Use **non-root IAM credentials** locally — the AWS account's root user cannot call
   `sts:GetServiceBearerToken` (used by `aws codeartifact login` / `get-authorization-token`),
   so root credentials can create the infra but can't actually read/publish from the registry.

## Outputs consumed by CI

`terraform output` from each environment provides:
- `registry_url` – set as the `registry`/`@rtm-ui:registry` value in `.npmrc`.
- `publisher_role_arn` / `reader_role_arn` – set as the `role-to-assume` input for the
  `aws-actions/configure-aws-credentials` step in the corresponding GitHub Actions workflow.

## Required GitHub repository secrets

Add these under Settings → Secrets and variables → Actions on whichever repo actually runs the
workflows (they must also be an OIDC-trusted repo — see `github_repo` in
`envs/{dev,prod}/terraform.tfvars`, or the `aws-actions/configure-aws-credentials` step will fail
with `Credentials could not be loaded`).

| Secret | Used by | Value |
|---|---|---|
| `CODEARTIFACT_READER_ROLE_ARN` | `ci.yml` | `terraform output reader_role_arn` (per env) |
| `CODEARTIFACT_PUBLISHER_ROLE_ARN` | `publish-dev.yml`, `publish-prod.yml` | `terraform output publisher_role_arn` (per env) |
| `TERRAFORM_ROLE_ARN` | `terraform.yml` | ARN of an IAM role able to plan/apply this Terraform (not currently provisioned by this repo — create manually or reuse an existing admin/CI role) |
| `GIT_USER_EMAIL` | `publish-prod.yml` | Git identity used to commit version bumps back to `master` |
| `GIT_USER_NAME` | `publish-prod.yml` | Git identity used to commit version bumps back to `master` |

Current dev values (sandbox account `077277969383`, `ap-southeast-2`):
```
CODEARTIFACT_READER_ROLE_ARN=arn:aws:iam::077277969383:role/rtm-kit-codeartifact-reader-dev
CODEARTIFACT_PUBLISHER_ROLE_ARN=arn:aws:iam::077277969383:role/rtm-kit-codeartifact-publisher-dev
```
(`TERRAFORM_ROLE_ARN`/`GIT_USER_EMAIL`/`GIT_USER_NAME` only needed if `terraform.yml` /
`publish-prod.yml` are exercised — not yet set up in dev.)

If you test in a personal/fork repo, remember to also set `github_repo` in that env's
`terraform.tfvars` to that repo (see "Assumptions to confirm" below) and re-apply — the OIDC
trust policy only allows the exact repo configured there.

## Assumptions to confirm before applying

- Target AWS account/region (`ap-southeast-2` used as the default, matching the existing
  CodeBuild badge in `README.md`).
- A Route53 hosted zone already exists in the target account for whichever domain/subdomain is
  used for the registry (the account does not need to own the `fiftyupclub.com` apex domain —
  a delegated zone is enough) **and is genuinely authoritative for it** (see the DNS gotcha
  above) — required only once `enable_custom_domain = true`.
- No pre-existing GitHub OIDC provider or Terraform state bucket with the same names in the
  account (the config assumes a clean slate; adjust `create_oidc_provider` in `envs/dev/main.tf`
  and `bootstrap` bucket/table names otherwise).

## Current deployment status (dev)

Deployed and smoke-tested successfully in the sandbox AWS account (`enable_custom_domain =
false`): CodeArtifact domain/repos, npmjs upstream fallback, IAM OIDC roles, and the API Gateway
reverse proxy are all live. A request through the proxy with a CodeArtifact auth token
successfully returned real `react` package metadata via the npmjs upstream, confirming the
end-to-end path (API Gateway → CodeArtifact → npmjs fallback) works.
