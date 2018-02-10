resource "aws_s3_bucket" "bucket" {
  bucket = "bucket-${var.name}"
  acl    = "private",
  force_destroy = true
}

resource "aws_s3_bucket_policy" "bucket" {
  bucket = "${aws_s3_bucket.bucket.id}"
  policy = "${data.aws_iam_policy_document.s3.json}"
}

