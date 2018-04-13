# Lambda
resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.lambda.arn}"
  principal     = "apigateway.amazonaws.com"
}

resource "aws_lambda_function" "lambda" {
  function_name    = "${var.name}"
  role             = "${aws_iam_role.lambda.arn}"
  handler          = "index.handler"
  runtime          = "nodejs8.10"
  timeout          = 5
  memory_size      = 1024
  filename         = "${data.archive_file.lambda_zip.output_path}"
  source_code_hash = "${data.archive_file.lambda_zip.output_base64sha256}"

  environment {
    variables = {
      BUCKET = "${aws_s3_bucket.download.bucket}"
      REGION = "${var.region}"
    }
  }
}
