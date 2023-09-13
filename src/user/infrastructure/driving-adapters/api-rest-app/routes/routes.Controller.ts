import { Request, Response, Router, NextFunction } from "express"
import { UserAlreadyExistsException } from "../../../../domain/exceptions/UserAlreadyExistsException"
import { UserNotFoundException } from "../../../../domain/exceptions/UserNotFoundException"
import userRoutes from './user.routes'



const route = Router()

route.use('/users', userRoutes)


route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof UserAlreadyExistsException) {
        res.status(400).json({
            message: 'El usuario ya ha sido registrado'
        })

    } else if (err instanceof UserNotFoundException) {
        res.status(400).json({
            message: 'No se encontro el usuario'
        })

    } else {
        next(err)
    }
})

route.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    res.status(500).json({
        error: err
    })
})

export default route