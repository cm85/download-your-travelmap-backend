data "aws_caller_identity" "current" {}

data "aws_acm_certificate" "christianhallercom" {
    domain   = "*.christianhaller.com"
    statuses = ["ISSUED"]
}

data "aws_route53_zone" "christianhaller" {
    name = "christianhaller.com"
}
resource "aws_route53_record" "example" {
    zone_id = "${data.aws_route53_zone.christianhaller.id}"
    name = "${aws_api_gateway_domain_name.api.domain_name}"
    type = "A"
    alias {
        name                   = "${aws_api_gateway_domain_name.api.cloudfront_domain_name}"
        zone_id                = "${aws_api_gateway_domain_name.api.cloudfront_zone_id}"
        evaluate_target_health = false
    }
}

resource "aws_iam_role" "lambda" {
    name = "DownloadYourTravelmapLambdaRole"
    assume_role_policy = "${data.aws_iam_policy_document.assume.json}"
}
