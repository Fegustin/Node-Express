import {Router} from 'express'
import * as controller from '../controllers/todoConroller.js'
import auth from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', controller.goToTodos)

router.get('/create', auth, controller.goToCreated)

router.post('/create', auth, controller.createdToRedirectTodos)

router.post('/complete', auth, controller.completeToRedirectTodos)

export default router