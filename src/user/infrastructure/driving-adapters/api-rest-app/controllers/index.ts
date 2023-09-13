import { createUser } from './user/createUser.controller'
import { getAllUsers } from './user/getUsers.controller'
import { updateUser } from './user/updateUser.controller'
import { deleteUser } from './user/deleteUser.controller'
import { InMemoryUserRepository } from '../../../implementation/InMemory/InMemoryUserRepository'

const inMemoryUserRepository = new InMemoryUserRepository()

export {
    getAllUsers as getAllUsersController,
    createUser as createUserController,
    updateUser as updateUserController,
    deleteUser as deleteUserController,
    inMemoryUserRepository
}