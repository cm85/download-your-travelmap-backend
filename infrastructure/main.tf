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

resource "aws_api_gateway_domain_name" "api" {
    domain_name = "${var.api_prefix}-${var.name}.christianhaller.com"
    certificate_arn = "${data.aws_acm_certificate.christianhallercom.arn}"
}

resource "aws_api_gateway_rest_api" "api" {
    name = "${var.name}"
}

resource "aws_api_gateway_resource" "resource" {
    path_part = "free-my-map"
    parent_id = "${aws_api_gateway_rest_api.api.root_resource_id}"
    rest_api_id = "${aws_api_gateway_rest_api.api.id}"
}

resource "aws_api_gateway_method" "method" {
    rest_api_id = "${aws_api_gateway_rest_api.api.id}"
    resource_id = "${aws_api_gateway_resource.resource.id}"
    http_method = "GET"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
    rest_api_id = "${aws_api_gateway_rest_api.api.id}"
    resource_id = "${aws_api_gateway_resource.resource.id}"
    http_method = "${aws_api_gateway_method.method.http_method}"
    integration_http_method = "POST"
    type = "AWS_PROXY"
    uri = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.lambda.arn}/invocations"
}

# Lambda
resource "aws_lambda_permission" "apigw_lambda" {
    statement_id = "AllowExecutionFromAPIGateway"
    action = "lambda:InvokeFunction"
    function_name = "${aws_lambda_function.lambda.arn}"
    principal = "apigateway.amazonaws.com"
    source_arn = "arn:aws:execute-api:${var.region}:${data.aws_caller_identity.current.account_id}:${aws_api_gateway_rest_api.api.id}/*/${aws_api_gateway_method.method.http_method}${aws_api_gateway_resource.resource.path}"
}

resource "aws_lambda_function" "lambda" {
    function_name = "${var.name}"
    role = "${aws_iam_role.role.arn}"
    handler = "app.handler"
    runtime = "nodejs6.10"
    timeout = 5
    memory_size = 1024
    filename = "${data.archive_file.lambda_zip.output_path}"
    source_code_hash = "${data.archive_file.lambda_zip.output_base64sha256}"
    environment {
        variables = {
            BUCKET = "${var.bucket}"
            REGION = "${var.region}"
        }
    }
}

# IAM
resource "aws_iam_role" "role" {
    name = "myrole"
    assume_role_policy = "${data.aws_iam_policy_document.assume.json}"
}

resource "aws_iam_role_policy" "test_policy" {
    name = "test_policy"
    role = "${aws_iam_role.role.id}"
    policy = "${data.aws_iam_policy_document.s3.json}"
}
