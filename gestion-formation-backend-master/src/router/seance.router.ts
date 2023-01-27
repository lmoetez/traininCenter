import { Router } from 'express'
import {
   addSeance,
   getSeance,
   deleteSeance,
   updateSeance,
   getSeances,
} from '../controller/seance.controller'

const seanceRouter = Router()

seanceRouter.route('/:id').get(getSeance).put(updateSeance).delete(deleteSeance)
seanceRouter.route('/').get(getSeances).post(addSeance)

export { seanceRouter }
