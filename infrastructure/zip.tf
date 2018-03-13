data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "./output"
  output_path = "./lambda/lambda.zip"
}
