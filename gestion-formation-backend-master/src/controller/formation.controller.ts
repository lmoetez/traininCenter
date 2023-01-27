import { Request, Response } from 'express'
import { FormationModel, IFormation } from '../model'
import jwt from 'jsonwebtoken'
import { ERole } from '../model/user.model'

const getFormation = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      const formations: IFormation = await FormationModel.findById(id).populate(
         ['formateur', 'owner']
      )
      res.json(formations)
   } catch (error) {
      next(error)
   }
}

const getFormations = async (req: Request, res: Response, next: any) => {
   try {
      const token = req.headers.authorization || ''
      const tokenData = jwt.decode(
         token,
         //@ts-ignore
         process.env.TOKEN_SECRET
      )

      const option: any = {}
      if (tokenData?.role.toString() === ERole.formateur.toString())
         option.formateur = tokenData.sub

      const formations: IFormation[] = await FormationModel.find(
         option
      ).populate(['formateur', 'owner'])
      res.json(formations)
   } catch (error) {
      next(error)
   }
}

const addFormation = async (req: Request, res: Response, next: any) => {
   try {
      const newFormation = await FormationModel.create({
         ...req.body,
      })
      res.json(newFormation)
   } catch (error) {
      next(error)
   }
}

const deleteFormation = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      await FormationModel.findByIdAndRemove(id)
      res.json('deleted')
   } catch (error) {
      next(error)
   }
}

const updateFormation = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      await FormationModel.findByIdAndUpdate(id, req.body, {
         omitUndefined: true,
      })
      res.json('update')
   } catch (error) {
      next(error)
   }
}

export {
   getFormation,
   addFormation,
   deleteFormation,
   updateFormation,
   getFormations,
}
