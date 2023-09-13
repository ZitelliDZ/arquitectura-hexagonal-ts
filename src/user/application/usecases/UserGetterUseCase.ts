import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repository/UserRepository";

export class UserGetterUseCase {
    private readonly _userRepository: UserRepository



    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    async run(): Promise<User[]> {

        const users = await this._userRepository.getAll()

        return users
    }

}