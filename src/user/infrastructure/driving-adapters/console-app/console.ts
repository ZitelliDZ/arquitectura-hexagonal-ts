import { UserCreatorUseCase } from "../../../application/usecases/UserCreatorUseCase"
import { User } from "../../../domain/entities/User"
import { InMemoryUserRepository } from "../../implementation/InMemory/InMemoryUserRepository"
import { v4 as uuid } from "uuid"
import { UserGetterUseCase } from "../../../application/usecases/UserGetterUseCase"
import { UserUpdaterUseCase } from "../../../application/usecases/UserUpdaterUseCase"
import { UserDeleterUseCase } from "../../../application/usecases/UserDeleterUseCase"
//import { DynamoDBUserRepository } from "../../implementation/Aws/dynamo-db/DynamoDBUserRepository"




(async () => {
    // Instanciamos el repositorio a utilizar
    const inMemoryUserRepository = InMemoryUserRepository.getInstance()

    const userGetterUserCase = new UserGetterUseCase(inMemoryUserRepository)


    let users = await userGetterUserCase.run()
    console.log(users)
    // Instanciamos el caso de uso enviando el repo
    const userCreatorUseCase = new UserCreatorUseCase(inMemoryUserRepository)

    const userToCreate: User = {
        name: 'Diego',
        age: 29,
        userName: 'ZiteDiego',
        id: uuid()
    }

    await userCreatorUseCase.run(userToCreate)

    const userToCreate2: User = {
        name: 'Diego',
        age: 29,
        userName: 'ZiteDiego2',
        id: uuid()
    }
    await userCreatorUseCase.run(userToCreate2)


    users = await userGetterUserCase.run()
    console.log(users)



    // actualizar
    const userUpdaterUseCase = new UserUpdaterUseCase(inMemoryUserRepository)


    console.log("🚀 ~ file: console.ts:55 ~  users[0].id:", users![0].id)
    const user = await userUpdaterUseCase.run({
        name: 'Luci',
        age: 29,
        userName: 'ZiteDiego2',
        id: users[0].id
    })
    console.log(user)
    users = await userGetterUserCase.run()
    console.log(users)

    // eliminar
    const userDeleterUseCase = new UserDeleterUseCase(inMemoryUserRepository)
    await userDeleterUseCase.run(users[0].id)
    users = await userGetterUserCase.run()
    console.log(users)

})()