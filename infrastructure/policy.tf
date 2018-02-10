data "aws_iam_policy_document" "assume" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      identifiers = ["lambda.amazonaws.com"]
      type = "Service"
    }
    sid = "hey"
    effect = "Allow"
  }
}

data "aws_iam_policy_document" "s3" {
  statement {
    actions = ["s3:*"]
    resources = ["${aws_s3_bucket.bucket.arn}/*"],
    principals {
      identifiers = ["${aws_iam_role.lambda.arn}"]
      type = "AWS"
    }
    sid = "hey"
    effect = "Allow"
  }
}
