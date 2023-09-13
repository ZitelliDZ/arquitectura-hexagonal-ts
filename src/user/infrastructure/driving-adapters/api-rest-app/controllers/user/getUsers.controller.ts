import { NextFunction, Request, Response } from "express";
import { UserGetterUseCase } from "../../../../../application/usecases/UserGetterUseCase";
import { InMemoryUserRepository } from "../../../../implementation/InMemory/InMemoryUserRepository";




export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {


    const inMemoryUserRepository = InMemoryUserRepository.getInstance()
    const userGetterUseCase = new UserGetterUseCase(inMemoryUserRepository)


    try {
        const users = await userGetterUseCase.run()
        res.json(users)
        return
    } catch (error) {
        return next(error)
    }
}