terraform {
  backend "s3" {
    bucket = "terraform-state-bucket-christianhaller"
    key    = "travelmap"
    region = "us-east-1"
  }
}

data "aws_caller_identity" "current" {}

/*
resource "aws_acm_certificate" "cert" {
    domain_name = "${var.name}.christianhaller.com"
    validation_method = "DNS"
}

resource "aws_route53_record" "cert_validation" {
    name = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_name}"
    type = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_type}"
    zone_id = "${data.aws_route53_zone.christianhaller.id}"
    records = ["${aws_acm_certificate.cert.domain_validation_options.0.resource_record_value}"]
    ttl = 60
}
*/

