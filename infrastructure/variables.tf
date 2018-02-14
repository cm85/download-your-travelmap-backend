variable "name" {
  default = "christian2018xxxx"
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
