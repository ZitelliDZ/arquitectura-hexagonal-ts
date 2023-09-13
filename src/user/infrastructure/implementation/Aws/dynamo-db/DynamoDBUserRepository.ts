import { User } from "../../../../domain/entities/User";
import { UserRepository } from "../../../../domain/repository/UserRepository";
import { DynamoDB } from "../../../driven-adapters/aws/dynamo-db/dynamo-db"




export class DynamoDBUserRepository implements UserRepository {

    private readonly _db = DynamoDB.getInstance()

    async getAll(): Promise<User[]> {
        const response = await this._db.scan({
            TableName: DynamoDB.TABLE_NAME,
            FilterExpression: "ENTITY_TYPE = :entity",
            ExpressionAttributeValues: {
                ":entity": {
                    S: 'USER'
                }
            }
        }).promise()

        const items = (response.Items != null) ? response.Items : []

        const users = items.map((item: any) => {
            const age: string = item.age.N ?? ''
            const id: string = item['USERS_PK'].S ?? ''
            const name: string = item.name.S ?? ''
            const userName: string = item.userName.S ?? ''

            return {
                age: Number(age),
                id: id.split('_')[1],
                name,
                userName
            }
        })
        return users
    }
    async save(user: User): Promise<User> {
        await this._db.putItem({
            TableName: DynamoDB.TABLE_NAME,
            Item: {
                'USERS_PK': {
                    S: `USER_${user.id}`
                },
                'USERS_SK': {
                    S: `USER_${user.id}`
                },
                ENTITY_TYPE: {
                    S: 'USER'
                },
                userName: {
                    S: user.userName
                },
                name: {
                    S: user.name
                },
                age: {
                    N: `${user.age}`
                },

            }
        }).promise()

        return user

    }

    async getByUserName(userName: string): Promise<User | null> {
        const response = await this._db.scan({
            TableName: DynamoDB.TABLE_NAME,
            FilterExpression: 'username = :username',
            ExpressionAttributeValues: {
                ':username': {
                    S: userName
                }
            }
        }).promise()

        const item = (response.Items !== undefined) ? response.Items[0] : undefined

        if (item === undefined) return null

        const age: string = item.age.N ?? ''
        const name: string = item.name.S ?? ''
        const userNameItem: string = item.userName.S ?? ''
        const id: string = item['USERS_PK'].S ?? ''

        const user: User = {
            age: Number(age),
            id: id.split('_')[1],
            name,
            userName: userNameItem
        }
        return user
    }


    async update(user: User): Promise<User> {
        await this._db.updateItem({
            TableName: DynamoDB.TABLE_NAME,
            Key: {
                'USERS_PK': {
                    S: `USER_${user.id}`
                },
                'USERS_SK': {
                    S: `USER_${user.id}`
                },
            },
            UpdateExpression: 'set #username = :username, #name=:name,#age=:age',
            ExpressionAttributeNames: {
                '#name': 'name',
                '#age': 'age',
                '#username': "username"
            },
            ExpressionAttributeValues: {
                ':username': {
                    S: user.userName
                },
                ':name': {
                    S: user.name
                },
                ':age': {
                    N: `${user.age}`
                }
            }
        }).promise()

        return user
    }

    async delete(user: User): Promise<void> {
        await this._db.deleteItem({
            TableName: DynamoDB.TABLE_NAME,
            Key: {
                'USERS_PK': {
                    S: `USER_${user?.id}`
                },
                'USERS_SK': {
                    S: `USER_${user?.id}`
                },
            }
        }).promise()
    }

    async getById(id: string): Promise<User | null> {
        const response = await this._db.scan({
            TableName: DynamoDB.TABLE_NAME,
            FilterExpression: '#pk = :pk',
            ExpressionAttributeNames: {
                '#pk': 'USERS_PK'
            },
            ExpressionAttributeValues: {
                ':pk': {
                    S: `USER_${id}`
                }
            }
        }).promise()

        const item = (response.Items !== undefined) ? response.Items[0] : undefined

        if (item === undefined) return null

        const age: string = item.age.N ?? ''
        const name: string = item.name.S ?? ''
        const userNameItem: string = item.userName.S ?? ''
        const idItem: string = item['USERS_PK'].S ?? ''

        const user: User = {
            age: Number(age),
            id: idItem.split('_')[1],
            name,
            userName: userNameItem
        }
        return user
    }
}