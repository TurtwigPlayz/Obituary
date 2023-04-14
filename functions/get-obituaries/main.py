import os
import boto3
from botocore.exceptions import ClientError
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

def handler(event, context):
    try:
        response = table.scan()
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return {
            'statusCode': 200,
            'body': json.dumps(response['Items'])
        }
