import { Router } from 'express'
import {
   getDocuments,
   addDocument,
   deleteDocument,
} from '../controller/document.controller'

const documentRouter = Router()

documentRouter.route('/:id').get(getDocuments).delete(deleteDocument)
documentRouter.route('/').post(addDocument)

export { documentRouter }
