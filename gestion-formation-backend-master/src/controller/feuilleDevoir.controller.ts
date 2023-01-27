import { Request, Response } from 'express'
import { FeuilleDevoirModel } from '../model'
import jwt from 'jsonwebtoken'

const getFeuilleDevoir = async (req: Request, res: Response, next: any) => {
   try {
      const id: any = req.params.id

      const token = req.headers.authorization || ''
      const tokenData = jwt.decode(
         token,
         //@ts-ignore
         process.env.TOKEN_SECRET
      )

      const feuilleDevoir = await FeuilleDevoirModel.findOne({
         devoir: id,
         user: tokenData?.sub,
      }).populate(['questions.question', 'user', 'devoir'])
      res.json({ dev: feuilleDevoir })
   } catch (error) {
      next(error)
   }
}

const getFeuilleDevoirs = async (req: Request, res: Response, next: any) => {
   try {
      const feuilleDevoirs = await FeuilleDevoirModel.find().populate([
         'questions.question',
         'user',
         'devoir',
      ])
      res.json(feuilleDevoirs)
   } catch (error) {
      next(error)
   }
}

const getFeuilleDevoirsBySession = async (
   req: Request,
   res: Response,
   next: any
) => {
   try {
      const id = req.params.id
      const feuilleDevoirs = await FeuilleDevoirModel.find({
         session: id,
      }).populate(['questions.question', 'user', 'devoir'])
      res.json(feuilleDevoirs)
   } catch (error) {
      next(error)
   }
}

const getFeuilleDevoirsByUser = async (
   req: Request,
   res: Response,
   next: any
) => {
   try {
      const id = req.params.id
      const feuilleDevoirs = await FeuilleDevoirModel.find({
         user: id,
      }).populate(['questions.question', 'user', 'devoir'])
      res.json(feuilleDevoirs)
   } catch (error) {
      next(error)
   }
}

const addFeuilleDevoir = async (req: Request, res: Response, next: any) => {
   try {
      const feuilleDevoir = await FeuilleDevoirModel.create(req.body)
      res.json(feuilleDevoir)
   } catch (error) {
      next(error)
   }
}

const deleteFeuilleDevoir = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      await FeuilleDevoirModel.findByIdAndRemove(id)

      res.json('deleted')
   } catch (error) {
      next(error)
   }
}

const updateFeuilleDevoir = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id

      await FeuilleDevoirModel.findByIdAndUpdate(id, req.body, {
         omitUndefined: true,
      })

      res.json('update')
   } catch (error) {
      next(error)
   }
}

export {
   getFeuilleDevoir,
   getFeuilleDevoirs,
   getFeuilleDevoirsBySession,
   getFeuilleDevoirsByUser,
   addFeuilleDevoir,
   deleteFeuilleDevoir,
   updateFeuilleDevoir,
}
