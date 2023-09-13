

import { Router } from "express"
import { createUserController, deleteUserController, getAllUsersController, updateUserController } from "../controllers"

const route = Router()

route.delete('/:id', deleteUserController)
route.put('/:id', updateUserController)
route.post('', createUserController)
route.get('', getAllUsersController)

export default route