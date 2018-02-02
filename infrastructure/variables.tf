variable "region" {
  default = "us-east-1"
  type = "string"
}

variable "bucket" {
  default = "new-download-your-travelmap"
  type = "string"
}


provider "aws" {
  region = "${var.region}"
}

variable "api_prefix" {
  default = "wtf"
}

variable "name" {
  default = "download-your-travelmap"
  type = "string"
}
