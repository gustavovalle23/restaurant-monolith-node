const AWS = require('aws-sdk')

export const AWSGateway = ({ config }) => {
  const baseAWSConfig = {
    endpoint: config.endpoint,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    s3ForcePathStyle: true,
  }

  const createDynamoDBClient = () => {
    return new AWS.DynamoDB({ ...baseAWSConfig })
  }

  const createS3Client = () => {
    return new AWS.S3({ ...baseAWSConfig })
  }

  const createSQSClient = () => {
    return new AWS.SQS({ ...baseAWSConfig })
  }

  return {
    createS3Client,
    createSQSClient,
    createDynamoDBClient,
  }
}
