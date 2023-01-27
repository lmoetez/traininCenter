import { Router } from 'express'
import {
   addFormation,
   getFormation,
   deleteFormation,
   updateFormation,
   getFormations,
} from '../controller/formation.controller'

const formationRouter = Router()

formationRouter
   .route('/:id')
   .get(getFormation)
   .put(updateFormation)
   .delete(deleteFormation)
formationRouter.route('/').get(getFormations).post(addFormation)

export { formationRouter }
