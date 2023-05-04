import Router from '@koa/router'
import suscriptionController from '../controllers/suscription.controllers'

const router = new Router()

router.get('/', suscriptionController.getAllSuscriptions)
router.get('/:id', suscriptionController.getSuscription)
router.post('/', suscriptionController.createSuscription)
router.put('/:id', suscriptionController.updateSuscription)
router.delete('/:id', suscriptionController.deleteSuscription)

export default router
