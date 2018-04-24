variable "region" {
  default = "us-east-1"
}

provider "aws" {
  region = "${var.region}"
}

variable "commitid" {
  default = "local"
}
variable "version" {
  default = 0
}
