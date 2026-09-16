variable "aws_region" {
  type    = string
  default = "ap-southeast-2"
}

variable "state_bucket_name" {
  type    = string
  default = "rtm-kit-terraform-state"
}

variable "lock_table_name" {
  type    = string
  default = "rtm-kit-terraform-locks"
}
