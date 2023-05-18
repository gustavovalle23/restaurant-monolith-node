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

  return {
    createDynamoDBClient,
  }
}
