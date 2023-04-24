import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'
import router from './routes'

const app = new Koa()

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

mongoose.connect('mongodb+srv://root:root@cluster0.uugf9ir.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MondoDB')
    app.listen(3000, () => {
      console.log('server is runnig on port 3000')
    })
  })
  .catch(err => {
    console.log('Error connecting to MondoDB', err)
  })
