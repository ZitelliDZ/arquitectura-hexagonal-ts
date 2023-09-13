import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";
import { UserGetterById } from "../../domain/services/UserGetterById";





export class UserUpdaterUseCase {
    private readonly _userRepository: UserRepository
    private readonly _userGetterById: UserGetterById



    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository
        this._userGetterById = new UserGetterById(userRepository)
    }


    async run(data: User): Promise<User> {
        const user = await this._userGetterById.run(data.id)

        const dataToUpdate: User = {
            age: data.age ?? user.age,
            name: data.name ?? user.name,
            id: data.id ?? user.id,
            userName: data.userName ?? user.userName
        }

        const userUpdated: User = await this._userRepository.update(dataToUpdate)

        return userUpdated
    }
}