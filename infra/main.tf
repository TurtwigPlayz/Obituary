terraform {
  required_providers {
    aws = {
      version = ">= 4.0.0"
      source  = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "ca-central-1"
}

resource "aws_s3_bucket" "obituaries_bucket" {
  bucket = "obituaries-bucket"
}

# two lambda functions w/ function url

resource "aws_lambda_function" "get_obituaries" {
  function_name = "get-obituaries"
  runtime = "python3.9"
  handler = "main.handler"
  filename = "${path.module}/functions/get-obituaries/main.zip"
  environment {
    variables = {
      DYNAMODB_TABLE = aws_dynamodb_table.obituaries_table.name
    }
  }
  role = aws_iam_role.lambda_role.arn
}

resource "aws_lambda_function" "create_obituary" {
  function_name = "create-obituary"
  runtime = "python3.9"
  handler = "main.handler"
  filename = "${path.module}/functions/create-obituary/main.zip"
  environment {
    variables = {
      S3_BUCKET = aws_s3_bucket.obituaries_bucket.id,
      DYNAMODB_TABLE = aws_dynamodb_table.obituaries_table.name
    }
  }
  role = aws_iam_role.lambda_role.arn
}

# one dynamodb table

resource "aws_dynamodb_table" "obituaries_table" {
  name = "obituaries"
  hash_key = "id"
  attribute {
    name = "id"
    type = "S"
  }
}

# roles and policies as needed

resource "aws_iam_role" "lambda_role" {
  name = "lambda_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
  role = aws_iam_role.lambda_role.name
}

resource "aws_iam_role_policy_attachment" "lambda_s3_policy_attachment" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
  role = aws_iam_role.lambda_role.name
}

# step functions (if you're going for the bonus marks)
