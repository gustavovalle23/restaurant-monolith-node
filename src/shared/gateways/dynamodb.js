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

  const client = createDynamoDBClient()

  const createUser = async ({ user }) => {
    const { $response } = await client.putItem({ Item: user, TableName: config.dynamoDBUserTable }).promise()
    return {
      $response,
    }
  }

  return {
    createUser,
  }
}
