import {Router} from 'express'
import auth from '../middleware/authMiddleware.js'
import * as controller from '../controllers/authController.js'

const router = Router()

router.get('/login', controller.goToLogin)

router.get('/logout', auth, controller.logout)

router.post('/login', controller.authenticate)

router.post('/registration', controller.registration)

export default router