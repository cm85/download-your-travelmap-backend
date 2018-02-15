variable "name" {
  default = "download-your-travelmap-reloaded"
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

variable "bucket_prefix" {
  default = "bucket"
}
