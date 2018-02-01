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
    resources =  [
  "arn:aws:s3:::${var.bucket}/*"
]
    sid = "hey"
    effect = "Allow"
  }
}

