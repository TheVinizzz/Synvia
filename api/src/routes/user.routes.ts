import {Router} from "express"
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController"
import { GetAllUserController } from "../modules/users/useCases/getAllUsers/GetAllUserController"

const createUserController = new CreateUserController()
const getAllUserController = new GetAllUserController()

const userRoutes = Router()

userRoutes.post('/', createUserController.handle)
userRoutes.post('/signin', createUserController.signIn)
userRoutes.get('/', getAllUserController.handle)

export {userRoutes}