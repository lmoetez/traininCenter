import { Request, Response } from 'express'
import { DocumentModel } from '../model'

const getDocuments = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id
      const docuemnts = await DocumentModel.find({ session: id }).populate([
         'session',
      ])
      res.json(docuemnts)
   } catch (error) {
      next(error)
   }
}

const addDocument = async (req: Request, res: Response, next: any) => {
   try {
      const devoir = await DocumentModel.create(req.body)
      res.json(devoir)
   } catch (error) {
      next(error)
   }
}

const deleteDocument = async (req: Request, res: Response, next: any) => {
   try {
      const id = req.params.id

      await DocumentModel.deleteOne({ _id: id })

      res.json('deleted')
   } catch (error) {
      next(error)
   }
}

export { getDocuments, addDocument, deleteDocument }
