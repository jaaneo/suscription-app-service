import Router from '@koa/router'
import suscriptionRoutes from './suscription.routes'
import authRoutes from './auth.routes'
import authHandler from '../middleware/authHandler'

const router = new Router()

router.get('/ping', async ctx => {
  ctx.body = 'pong'
})

router.use('/api/suscriptions', authHandler, suscriptionRoutes.routes())
router.use('/api/auth', authRoutes.routes())

export default router
