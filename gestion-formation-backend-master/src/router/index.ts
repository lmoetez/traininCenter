import { Router } from 'express'

import { userRouter } from './user.router'
import { formationRouter } from './formation.router'
import { sessionRouter } from './session.router'
import { devoirRouter } from './devoir.router'
import { feuilleDevoirRouter } from './feuilleDevoir.router'
import { documentRouter } from './document.router'
import { inscriptionRouter } from './inscription.router'
import { seanceRouter } from './seance.router'
import { authRouter } from './auth.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/formation', formationRouter)
router.use('/session', sessionRouter)
router.use('/devoir', devoirRouter)
router.use('/feuilleDevoir', feuilleDevoirRouter)
router.use('/document', documentRouter)
router.use('/inscription', inscriptionRouter)
router.use('/seance', seanceRouter)

export { router }
