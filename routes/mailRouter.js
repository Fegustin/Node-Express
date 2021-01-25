import {Router} from 'express'
import * as controller from "../controllers/mailController.js";

const router = Router()

router.get('/mail', controller.sendMail)

router.post('/mail', controller.sendMailPost)

export default router