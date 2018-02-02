variable "region" {
  default = "us-east-1"
}

variable "bucket" {
  default = "new-download-your-travelmap"
}

provider "aws" {
  region = "${var.region}"
}

variable "api_prefix" {
  default = "wtf"
}

variable "name" {
  default = "download-your-travelmap"
}
