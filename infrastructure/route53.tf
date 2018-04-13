data "aws_acm_certificate" "christianhallercom" {
  domain   = "*.christianhaller.com"
  statuses = ["ISSUED"]
}

data "aws_route53_zone" "christianhaller" {
  name = "christianhaller.com"
}

resource "aws_route53_record" "api" {
  zone_id = "${data.aws_route53_zone.christianhaller.id}"
  name    = "${aws_api_gateway_domain_name.api.domain_name}"
  type    = "A"

  alias {
    name                   = "${aws_api_gateway_domain_name.api.cloudfront_domain_name}"
    zone_id                = "${aws_api_gateway_domain_name.api.cloudfront_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "frontend" {
  zone_id = "${data.aws_route53_zone.christianhaller.id}"
  name    = "${aws_cloudfront_distribution.s3_distribution.aliases[0]}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.s3_distribution.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.s3_distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_iam_role" "lambda" {
  name               = "DownloadYourTravelmapLambdaRole"
  assume_role_policy = "${data.aws_iam_policy_document.assume.json}"
}
