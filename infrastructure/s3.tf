resource "aws_s3_bucket" "bucket" {
  bucket        = "${var.bucket}"
  acl           = "private"
  force_destroy = true
}

resource "aws_s3_bucket_policy" "bucket" {
  bucket = "${aws_s3_bucket.bucket.id}"
  policy = "${data.aws_iam_policy_document.s3.json}"
}

// allow lambda to write to s3
data "aws_iam_policy_document" "s3" {
  statement {
    actions   = ["s3:putObject"]
    resources = ["${aws_s3_bucket.bucket.arn}/*"]

    principals {
      identifiers = ["${aws_iam_role.lambda.arn}"]
      type        = "AWS"
    }

    sid    = "AllowLambdaToWriteToS3"
    effect = "Allow"
  }
}
