data "aws_iam_policy_document" "assume" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      identifiers = ["lambda.amazonaws.com"]
      type        = "Service"
    }

    sid    = "hey"
    effect = "Allow"
  }
}

data "aws_iam_policy_document" "ses" {
  statement {
    actions   = ["ses:Send*", "logs:*", "s3:*"]
    resources = ["*"]
    sid       = "rrhey"
    effect    = "Allow"
  }
}

resource "aws_iam_policy" "ses" {
  name   = "ses"
  policy = "${data.aws_iam_policy_document.ses.json}"
}

resource "aws_iam_role_policy_attachment" "attachement" {
  role       = "${aws_iam_role.lambda.id}"
  policy_arn = "${aws_iam_policy.ses.arn}"
}
