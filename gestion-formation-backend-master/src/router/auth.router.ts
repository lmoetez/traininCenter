import { Router } from 'express'
import { signin, signup } from '../controller/auth.controller'

const authRouter = Router()

authRouter.route('/signin').post(signin)
authRouter.route('/signup').post(signup)

export { authRouter }
