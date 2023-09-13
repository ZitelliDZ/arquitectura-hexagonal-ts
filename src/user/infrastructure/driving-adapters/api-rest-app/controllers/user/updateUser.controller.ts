import { NextFunction, Request, Response } from "express";
import { User } from '../../../../../domain/entities/User'
import { UserUpdaterUseCase } from "../../../../../application/usecases/UserUpdaterUseCase";
import { InMemoryUserRepository } from "../../../../implementation/InMemory/InMemoryUserRepository";


export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
        userName,
        age,
        name
    } = req.body

    const userId = req.params.id

    const inMemoryUserRepository = InMemoryUserRepository.getInstance()
    const userUpdaterUseCase = new UserUpdaterUseCase(inMemoryUserRepository)


    try {
        const userToUpdate: User = {
            age,
            id: userId,
            name,
            userName
        }
        const user = await userUpdaterUseCase.run(userToUpdate)
        res.json(user)
        return
    } catch (error) {
        return next(error)
    }
}