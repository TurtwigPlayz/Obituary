# add your create-obituary function here
import os
import boto3
import json
import openai
from datetime import datetime
from botocore.exceptions import ClientError

openai.api_key = "YOUR_API_KEY"
s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])
polly = boto3.client('polly')

def handler(event, context):
    try:
        # Parse input from API Gateway event
        body = json.loads(event['body'])
        name = body['name']
        date_of_birth = body['date_of_birth']
        date_of_death = body['date_of_death']
        obituary_text = generate_obituary(name, date_of_birth, date_of_death)

        # Save the obituary text to S3
        object_key = save_obituary_to_s3(obituary_text)

        # Save the obituary details to DynamoDB
        item = {
            'id': str(datetime.now().timestamp()),
            'name': name,
            'date_of_birth': date_of_birth,
            'date_of_death': date_of_death,
            'obituary_text': obituary_text,
            's3_object_key': object_key
        }
        table.put_item(Item=item)

        # Convert obituary text to speech using Amazon Polly
        speech_url = convert_text_to_speech(obituary_text)

        # Return success response
        response = {
            'statusCode': 200,
            'body': json.dumps({'success': True, 'speech_url': speech_url})
        }
    except Exception as e:
        # Return error response
        response = {
            'statusCode': 500,
            'body': json.dumps({'success': False, 'error': str(e)})
        }
    return response

def generate_obituary(name, date_of_birth, date_of_death):
    prompt = f"Write an obituary for {name}, who was born on {date_of_birth} and passed away on {date_of_death}."
    model = "text-davinci-002"
    response = openai.Completion.create(
        engine=model,
        prompt=prompt,
        max_tokens=1024,
        temperature=0.7,
        n=1,
        stop=None,
        timeout=10
    )
    obituary_text = response.choices[0].text.strip()
    return obituary_text

def save_obituary_to_s3(obituary_text):
    # Save obituary text to S3
    object_key = f"{str(datetime.now().timestamp())}.txt"
    s3.put_object(Body=obituary_text, Bucket=os.environ['S3_BUCKET'], Key=object_key)
    return object_key

def convert_text_to_speech(text):
    # Use Amazon Polly to convert text to speech
    # response = polly.synthesize_speech(Text=text, OutputFormat='mp3', VoiceId='Joanna')
    # speech_url = save_speech_to_s3(response['AudioStream'])
    # return speech_url
    speech_url = "https://example.com/speech.mp3"
    return speech_url

def save_speech_to_s3(audio_stream):
    # Save speech audio to S3
    object_key = f"{str(datetime.now().timestamp())}.mp3"
    s3.put_object(Body=audio_stream, Bucket=os.environ['S3_BUCKET'], Key=object_key)
    speech_url = f"https://{os.environ['S3_BUCKET']}.s3.amazonaws
