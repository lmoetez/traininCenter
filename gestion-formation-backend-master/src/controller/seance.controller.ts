import { Request, Response } from 'express'
import { SeanceModel, ISeance } from '../model'

const getSeance = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      const seance = await SeanceModel.findById(id)
      res.json(seance)
   } catch (error) {
      next(error)
   }
}

const getSeances = async (req: Request, res: Response, next: any) => {
   try {
      const seances: ISeance[] = await SeanceModel.find()
      res.json(seances)
   } catch (error) {
      next(error)
   }
}

const addSeance = async (req: Request, res: Response, next: any) => {
   try {
      const newSeance = await SeanceModel.create(req.body)
      res.json(newSeance)
   } catch (error) {
      next(error)
   }
}

const deleteSeance = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      await SeanceModel.findByIdAndRemove(id)
      res.json('deleted')
   } catch (error) {
      next(error)
   }
}

const updateSeance = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      await SeanceModel.findByIdAndUpdate(id, req.body, {
         omitUndefined: true,
      })
      res.json('update')
   } catch (error) {
      next(error)
   }
}

export { getSeance, addSeance, deleteSeance, updateSeance, getSeances }
