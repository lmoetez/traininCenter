import { Router } from 'express'
import {
   addInscriptions,
   getInscription,
   getInscriptions,
   deleteInscriptions,
   updateInscriptions,
} from '../controller/inscription.controller'

const inscriptionRouter = Router()

//get media
inscriptionRouter
   .route('/:id')
   .get(getInscription)
   .put(updateInscriptions)
   .delete(deleteInscriptions)
inscriptionRouter.route('/').get(getInscriptions).post(addInscriptions)

export { inscriptionRouter }
