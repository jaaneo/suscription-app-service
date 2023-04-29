import Router from '@koa/router'
import taskRoutes from './task.routes'
import authRoutes from './auth.routes'

const router = new Router()

router.get('/ping', async ctx => {
  ctx.body = 'pong'
})

router.use('/v1/task', taskRoutes.routes())
router.use('/v1/auth', authRoutes.routes())

export default router
