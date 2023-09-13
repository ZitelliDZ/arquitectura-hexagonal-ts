import { NextFunction, Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import { User } from '../../../../../domain/entities/User'
import { UserCreatorUseCase } from "../../../../../application/usecases/UserCreatorUseCase";
import { InMemoryUserRepository } from "../../../../implementation/InMemory/InMemoryUserRepository";





export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
        userName,
        age,
        name
    } = req.body

    const inMemoryUserRepository = InMemoryUserRepository.getInstance()
    const userCreatorUseCase = new UserCreatorUseCase(inMemoryUserRepository)

    const userToCreate: User = {
        id: uuidV4(),
        userName, age, name
    }

    try {
        const userCreated = await userCreatorUseCase.run(userToCreate)
        res.json(userCreated)
        return
    } catch (error) {
        return next(error)
    }
}