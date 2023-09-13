import { UserRepository } from "../repository/UserRepository";

export class ExistUserByUserName {
    private readonly _userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this._userRepository = userRepository;
    }

    async run(userName: string): Promise<boolean> {
        const user = await this._userRepository.getByUserName(userName)

        if (user !== null) return true

        return false
    }
}