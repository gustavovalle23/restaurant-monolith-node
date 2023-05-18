import { AWSGateway } from "../../../shared/gateways/aws"

export const createDynamoDBRepository = ({ config }) => {
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
