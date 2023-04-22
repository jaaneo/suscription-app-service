import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './routes'

const app = new Koa()

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
  console.log('server is runnig on port 3000')
})
