import Router from '@koa/router'
import authController from '../controllers/auth.controllers'

const router = new Router()

router.post('/login', authController.login)
router.post('/register', authController.register)

export default router
