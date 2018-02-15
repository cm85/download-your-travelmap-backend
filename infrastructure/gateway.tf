resource "aws_api_gateway_domain_name" "api" {
  domain_name = "${var.api_prefix}-${var.name}.christianhaller.com"
  certificate_arn = "${data.aws_acm_certificate.christianhallercom.arn}"
}

resource "aws_api_gateway_rest_api" "api" {
  name = "${var.name}"
}

resource "aws_api_gateway_method" "method" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_rest_api.api.root_resource_id}"
  http_method = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "integration" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  resource_id = "${aws_api_gateway_rest_api.api.root_resource_id}"
  http_method = "${aws_api_gateway_method.method.http_method}"
  integration_http_method = "POST"
  type = "AWS_PROXY"
  uri = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.lambda.arn}/invocations"
}

resource "aws_api_gateway_base_path_mapping" "test" {
  api_id      = "${aws_api_gateway_rest_api.api.id}"
  stage_name  = "${aws_api_gateway_stage.stage.stage_name}"
  domain_name = "${aws_api_gateway_domain_name.api.domain_name}"
  depends_on = ["aws_api_gateway_method.method"]
}

// deployment

resource "aws_api_gateway_stage" "stage" {
  depends_on = ["aws_api_gateway_integration.integration"]
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name = "prod"
  cache_cluster_enabled = true
  cache_cluster_size = 0.5
  deployment_id = "${aws_api_gateway_deployment.deployment.id}"
}

resource "aws_api_gateway_deployment" "deployment" {
  rest_api_id = "${aws_api_gateway_rest_api.api.id}"
  stage_name = "prod"
  depends_on = ["aws_api_gateway_integration.integration"]
}
