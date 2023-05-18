const AWS = require('aws-sdk')

export const AWSGateway = ({ config }) => {
  const createDynamoDBClient = () => {
    return new AWS.DynamoDB({
      endpoint: config.endpoint,
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      s3ForcePathStyle: true,
    })
  }

  const createS3Client = () => {
    return new AWS.S3({
      endpoint: config.endpoint,
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      s3ForcePathStyle: true,
    })
  }

  const createSQSClient = () => {
    return new AWS.SQS({
      endpoint: config.endpoint,
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      s3ForcePathStyle: true,
    })
  }

  return {
    createS3Client,
    createSQSClient,
    createDynamoDBClient,
  }
}
