variable "name" {
  default = "dytm2018"
}

variable "region" {
  default = "us-east-1"
}

provider "aws" {
  region = "${var.region}"
}

variable "api_prefix" {
  default = "api"
}
