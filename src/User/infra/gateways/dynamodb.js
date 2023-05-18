import { AWSGateway } from "../../../shared/gateways/dynamodb"

export const DynamoDBRepository = ({ config }) => {
  const aws = AWSGateway({ config })
  const client = aws.createDynamoDBClient()

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
