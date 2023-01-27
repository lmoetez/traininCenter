import { Router } from 'express'
import {
   getDevoir,
   getDevoirs,
   getDevoirsBySession,
   deleteDevoir,
   updateDevoir,
   addDevoir,
} from '../controller/devoir.controller'

const devoirRouter = Router()

devoirRouter.route('/session/:id').get(getDevoirsBySession)
devoirRouter.route('/:id').get(getDevoir).put(updateDevoir).delete(deleteDevoir)
devoirRouter.route('/').get(getDevoirs).post(addDevoir)

export { devoirRouter }
