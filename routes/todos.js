import {Router} from 'express'
import * as controller from '../controllers/todoConroller.js'

const router = Router()

router.get('/', controller.goToTodos)

router.get('/create', controller.goToCreated)

router.post('/create', controller.createdToRedirectTodos)

router.post('/complete', controller.completeToRedirectTodos)

export default router