import { Router } from 'express'
import {
   getUser,
   addUsers,
   getUsers,
   deleteUsers,
   updateUsers,
   getUserToken,
} from '../controller/user.controller'

const userRouter = Router()

//get media
userRouter.route('/token').get(getUserToken)
userRouter.route('/:id').get(getUser).put(updateUsers).delete(deleteUsers)
userRouter.route('/').get(getUsers).post(addUsers)

export { userRouter }
