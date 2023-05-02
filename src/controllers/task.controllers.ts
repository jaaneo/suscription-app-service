import { ValidationError } from 'joi'
import { Context } from 'koa'
import { nanoid } from 'nanoid'
import { TaskInputDTO } from '../@types/dto'
import Task from '../models/Task'
import { taskCreateSchema, taskUpdateSchema } from '../schemas/task.schemas'
import ServiceError from '../errors/ServiceError'

async function getAllTasks (ctx: Context) {
  const userId = ctx.state.user.id
  const tasks = await Task.find({ userId })
  const jsonTasks = tasks.map(task => task.toJSON())
  ctx.body = jsonTasks
}

async function getTask (ctx: Context) {
  const id = ctx.params.id as string
  const userId = ctx.state.user.id

  const task = await Task.findOne({ id, userId })

  if (task) {
    ctx.body = task
  } else {
    ctx.status = 404
  }
}

async function createTask (ctx: Context) {
  const payload = ctx.request.body as TaskInputDTO
  const userId = ctx.state.user.id

  try {
    const validated: TaskInputDTO = await taskCreateSchema.validateAsync(payload)

    const newTask = new Task({
      id: nanoid(),
      ...validated,
      userId
    })
    const response = await newTask.save()
    ctx.body = response
    ctx.status = 201
  } catch (err) {
    const validationError = err as ValidationError
    if (validationError.isJoi) {
      throw new ServiceError(400, validationError.message)
    }
    throw err
  }
}

async function updateTask (ctx: Context) {
  const id = ctx.params.id as string
  const payload = ctx.request.body as Partial<TaskInputDTO>
  const userId = ctx.state.user.id

  if (Object.values(payload).length === 0) {
    throw new ServiceError(400, 'No data to update')
  }

  try {
    const validated = await taskUpdateSchema.validateAsync(payload)
    const updatedTask = await Task.findOneAndUpdate({ id, userId }, validated, { new: true })
    if (updatedTask) {
      ctx.body = updatedTask.toJSON()
    } else {
      ctx.status = 404
    }
  } catch (err) {
    const validationError = err as ValidationError
    if (validationError.isJoi) {
      throw new ServiceError(400, validationError.message)
    }
  }
}

async function deleteTask (ctx: Context) {
  const id = ctx.params.id as string
  const userId = ctx.state.user.id
  await Task.findOneAndDelete({ id, userId })
  ctx.status = 204
}

export default {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}
