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
