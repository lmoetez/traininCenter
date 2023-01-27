import { Router } from 'express'
import {
   addSession,
   getSessions,
   getSession,
   deleteSession,
   updateSession,
} from '../controller/session.controller'

const sessionRouter = Router()

sessionRouter
   .route('/:id')
   .get(getSession)
   .put(updateSession)
   .delete(deleteSession)
sessionRouter.route('/').get(getSessions).post(addSession)

export { sessionRouter }
