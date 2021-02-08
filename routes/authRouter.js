import {Router} from 'express'
import passport from 'passport'
import * as controller from '../controllers/authController.js'

const router = Router()

router.get('/login', controller.goToLogin)

router.get('/reset', controller.goToReset)

router.get('/password/:token', controller.goToNewPassword)

router.get('/logout', passport.authenticate('jwt', {session: false}), controller.logout)

router.post('/login', controller.authenticate)

router.post('/registration', controller.registration)

router.post('/reset', controller.resetPassword)

router.post('/password', controller.newPassword)

export default router