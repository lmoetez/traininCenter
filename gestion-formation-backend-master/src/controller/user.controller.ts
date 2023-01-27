import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { UserModel, IUser } from '../model'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

const getUser = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      const users = await UserModel.findById(id)
      res.json(users)
   } catch (error) {
      next(error)
   }
}

const getUserToken = async (req: Request, res: Response, next: any) => {
   try {
      const token = req.headers.authorization || ''
      const tokenData = jwt.decode(
         token,
         //@ts-ignore
         process.env.TOKEN_SECRET
      )
      if (!tokenData?.sub)
         throw new createHttpError.BadRequest("Token doesn't exist")
      const user = await UserModel.findById(tokenData?.sub || '')
      res.json(user)
   } catch (error) {
      next(error)
   }
}

const getUsers = async (req: Request, res: Response, next: any) => {
   try {
      const users: IUser[] = await UserModel.find()
      res.json(users)
   } catch (error) {
      next(error)
   }
}

const addUsers = async (req: Request, res: Response, next: any) => {
   try {
      const { email } = req.body
      const user = await UserModel.findOne({ email })
      if (user) throw new createHttpError.Conflict('Email Exist')

      const salt = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(req.body.password, salt)

      const newUser = await UserModel.create({
         ...req.body,
         password,
      })
      res.json(newUser)
   } catch (error) {
      next(error)
   }
}

const deleteUsers = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      await UserModel.findByIdAndRemove(id)
      res.json('deleted')
   } catch (error) {
      next(error)
   }
}

const updateUsers = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id

      let password
      if (req.body.password) {
         const salt = await bcrypt.genSalt(10)
         password = await bcrypt.hash(req.body.password, salt)
      }

      await UserModel.findByIdAndUpdate(
         id,
         { ...req.body, password },
         { omitUndefined: true }
      )
      res.json('update')
   } catch (error) {
      next(error)
   }
}

export { getUser, getUsers, getUserToken, addUsers, deleteUsers, updateUsers }
