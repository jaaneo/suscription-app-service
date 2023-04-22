import Router from '@koa/router'

interface ServiceReqBody {
  name?: string
}

const router = new Router()

router.get('/', ctx => {
  ctx.body = 'Hello World GET'
})

router.post('/', ctx => {
  const reqBody = ctx.request.body as ServiceReqBody
  ctx.body = `Hello ${reqBody.name || 'World'} POST`
})

export default router
