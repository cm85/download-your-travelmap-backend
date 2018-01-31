data "archive_file" "lambda_zip" {
    type        = "zip"
    source_dir  = "../dist"
    output_path = "../lambda.zip"
}
