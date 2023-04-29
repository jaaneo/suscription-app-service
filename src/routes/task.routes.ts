import Router from '@koa/router'
import taskController from '../controllers/task.controllers'

const router = new Router()

router.get('/', taskController.getAllTasks)
router.get('/:id', taskController.getTask)
router.post('/', taskController.createTask)
router.put('/:id', taskController.updateTask)
router.delete('/:id', taskController.deleteTask)

export default router
