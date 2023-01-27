import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { SessionModel, ISession, FormationModel } from '../model'
import { ERole } from '../model/user.model'

const getSession = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      const session = await SessionModel.findById(id).populate([
         'formation',
         'seance',
      ])
      res.json(session)
   } catch (error) {
      next(error)
   }
}

const getSessions = async (req: Request, res: Response, next: any) => {
   try {
      const token = req.headers.authorization || ''
      const tokenData = jwt.decode(
         token,
         //@ts-ignore
         process.env.TOKEN_SECRET
      )

      if (tokenData?.role === ERole.formateur) {
         const formations = await FormationModel.find({
            formateur: tokenData?.sub,
         })
         const idsFormations = formations.map((e) => e._id)

         const sessions = await SessionModel.find({
            sessions: { $in: idsFormations },
         }).populate(['formation', 'seance'])
         res.json(sessions)
      } else {
         const sessions = await SessionModel.find().populate([
            'formation',
            'seance',
         ])
         res.json(sessions)
      }
   } catch (error) {
      next(error)
   }
}

const addSession = async (req: Request, res: Response, next: any) => {
   try {
      const newSession = await SessionModel.create(req.body)

      const formation = await FormationModel.findById(newSession.formation)

      if (formation)
         await FormationModel.findOneAndUpdate(
            { _id: formation._id },
            { sessionNumber: (formation.sessionNumber || 0) + 1 }
         )

      res.json(newSession)
   } catch (error) {
      next(error)
   }
}

const deleteSession = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id

      //@ts-ignore
      const session: ISession = await SessionModel.findById(id)
      const formation = await FormationModel.findById(session.formation)
      if (formation)
         await FormationModel.findOneAndUpdate(
            { _id: formation._id },
            { sessionNumber: (formation.sessionNumber || 0) - 1 }
         )

      await SessionModel.findByIdAndRemove(id)

      res.json('deleted')
   } catch (error) {
      next(error)
   }
}

const updateSession = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id

      //@ts-ignore
      const session: ISession = await SessionModel.findById(id)
      const formation = await FormationModel.findById(session.formation)
      if (formation)
         await FormationModel.findOneAndUpdate(
            { _id: formation._id },
            { sessionNumber: (formation.sessionNumber || 0) - 1 }
         )

      //@ts-ignore
      const sessionUpdated: ISession = await SessionModel.findByIdAndUpdate(
         id,
         req.body,
         {
            omitUndefined: true,
         }
      )

      const formation1 = await FormationModel.findById(sessionUpdated.formation)
      if (formation1)
         await FormationModel.findOneAndUpdate(
            { _id: formation1._id },
            { sessionNumber: (formation1.sessionNumber || 0) + 1 }
         )

      res.json('update')
   } catch (error) {
      next(error)
   }
}

export { getSession, addSession, deleteSession, updateSession, getSessions }
