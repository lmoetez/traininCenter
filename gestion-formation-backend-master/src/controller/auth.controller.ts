import { Request, Response } from 'express'
import { UserModel } from '../model'
import bcrypt from 'bcryptjs'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

const signin = async (req: Request, res: Response, next: any) => {
   try {
      const { email, password } = req.body

      //check Email
      const user = await UserModel.findOne({ email })

      if (!user)
         throw new createHttpError.BadRequest('Invalid Email or Password')

      const passwordCheck = await bcrypt.compare(password, user.password)

      if (!passwordCheck)
         throw new createHttpError.BadRequest('Invalid Email or Password')

      const token = jwt.sign(
         {
            sub: user._id,
            role: user.role,
            iss: 'gestion-formation',
         },
         //@ts-ignore
         process.env.TOKEN_SECRET
      )
      res.json({ token, role: user.role })
   } catch (error) {
      next(error)
   }
}

const signup = async (req: Request, res: Response, next: any) => {
   try {
      //check Email
      const user = await UserModel.findOne({ email: req.body.email })

      if (user) throw new createHttpError.Conflict('Email Exist')

      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(req.body.password, salt)

      const newUser = await UserModel.create({ ...req.body, password })
      res.json(newUser)
   } catch (error) {
      next(error)
   }
}

export { signin, signup }
