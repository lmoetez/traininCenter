import { Router } from 'express'
import {
   getFeuilleDevoir,
   getFeuilleDevoirs,
   getFeuilleDevoirsBySession,
   getFeuilleDevoirsByUser,
   addFeuilleDevoir,
   updateFeuilleDevoir,
   deleteFeuilleDevoir,
} from '../controller/feuilleDevoir.controller'

const feuilleDevoirRouter = Router()

feuilleDevoirRouter.route('/user/:id').get(getFeuilleDevoirsByUser)
feuilleDevoirRouter.route('/session/:id').get(getFeuilleDevoirsBySession)
feuilleDevoirRouter
   .route('/:id')
   .get(getFeuilleDevoir)
   .put(updateFeuilleDevoir)
   .delete(deleteFeuilleDevoir)
feuilleDevoirRouter.route('/').get(getFeuilleDevoirs).post(addFeuilleDevoir)

export { feuilleDevoirRouter }
