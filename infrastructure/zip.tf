data "archive_file" "lambda_zip" {
    type        = "zip"
    source_dir  = "../backend"
    output_path = "../lambda.zip"
}
