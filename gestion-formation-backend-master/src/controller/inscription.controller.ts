import { Request, Response } from 'express'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import {
   InscriptionModel,
   IInscription,
   FormationModel,
   IFormation,
   SessionModel,
} from '../model'
import { ERole } from '../model/user.model'

const getInscription = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      const inscription: IInscription = await InscriptionModel.findById(
         id
      ).populate(['user', 'session'])
      res.json(inscription)
   } catch (error) {
      next(error)
   }
}
const getInscriptions = async (req: Request, res: Response, next: any) => {
   try {
      const token = req.headers.authorization || ''
      const tokenData = jwt.decode(
         token,
         //@ts-ignore
         process.env.TOKEN_SECRET
      )
      if (!tokenData?.sub)
         throw new createHttpError.Unauthorized('Invalid token')

      if (tokenData.role === ERole.admin) {
         const inscriptions: IInscription[] =
            await InscriptionModel.find().populate(['user', 'session'])
         res.json(inscriptions)
      } else if (tokenData.role === ERole.formateur) {
         const formations = await FormationModel.find({
            formateur: tokenData?.sub,
         })
         const idsFormations = formations.map((e) => e._id)

         const sessions = await SessionModel.find({
            formation: { $in: idsFormations },
         })
         const idsSessions = sessions.map((e) => e._id)

         const inscriptions: IInscription[] = await InscriptionModel.find({
            session: { $in: idsSessions },
         }).populate(['user', 'session'])
         res.json(inscriptions)
      } else {
         const inscriptions: IInscription[] = await InscriptionModel.find({
            user: tokenData?.sub,
         }).populate(['user', 'session'])
         res.json(inscriptions)
      }
   } catch (error) {
      next(error)
   }
}

const addInscriptions = async (req: Request, res: Response, next: any) => {
   try {
      const token = req.headers.authorization || ''
      const tokenData = jwt.decode(
         token,
         //@ts-ignore
         process.env.TOKEN_SECRET
      )
      if (!tokenData?.sub)
         throw new createHttpError.Unauthorized('Invalid token')

      const insc = await InscriptionModel.findOne({
         user: tokenData.sub,
         session: req.body.session,
      })
      if (insc) throw new createHttpError.Conflict('Alredy Inscription')

      const newInscription = await InscriptionModel.create({
         ...req.body,
         user: tokenData.sub,
      })
      res.json(newInscription)
   } catch (error) {
      next(error)
   }
}

const deleteInscriptions = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      await InscriptionModel.findByIdAndRemove(id)
      res.json('deleted')
   } catch (error) {
      next(error)
   }
}

const updateInscriptions = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      await InscriptionModel.findByIdAndUpdate(id, req.body, {
         omitUndefined: true,
      })
      res.json('update')
   } catch (error) {
      next(error)
   }
}

export {
   getInscription,
   getInscriptions,
   addInscriptions,
   deleteInscriptions,
   updateInscriptions,
}
