import Router from '@koa/router'
import taskRoutes from './task.routes'

const router = new Router()

router.get('/ping', async ctx => {
  ctx.body = 'pong'
})

router.use('/v1/task', taskRoutes.routes())

export default router
