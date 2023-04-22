import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import taskRouter from './routes/task.routes'

const app = new Koa()

app.use(bodyParser())

app.use(taskRouter.routes())
app.use(taskRouter.allowedMethods())

app.listen(3000, () => {
  console.log('server is runnig on port 3000')
})
