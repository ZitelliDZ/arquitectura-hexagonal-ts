import { NextFunction, Request, Response } from "express";
import { UserDeleterUseCase } from "../../../../../application/usecases/UserDeleterUseCase";
import { InMemoryUserRepository } from "../../../../implementation/InMemory/InMemoryUserRepository";


export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userId = req.params.id

    const inMemoryUserRepository = InMemoryUserRepository.getInstance()
    const userDeleterUseCase = new UserDeleterUseCase(inMemoryUserRepository)


    try {
        const userDeleted = await userDeleterUseCase.run(userId)
        res.json(userDeleted)
        return
    } catch (error) {
        return next(error)
    }
}