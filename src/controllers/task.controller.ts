import { Context } from 'koa'
import { nanoid } from 'nanoid'
import { TaskInputDTO } from '../@types/dto'
import Task from '../models/Task'

async function getAllTasks (ctx: Context) {
  const tasks = await Task.find()
  const jsonTasks = tasks.map(task => task.toJSON())
  ctx.body = jsonTasks
}

async function getTask (ctx: Context) {
  const id = ctx.params.id as string

  const task = await Task.findOne({ id })

  if (task) {
    ctx.body = task
  } else {
    ctx.status = 404
  }
}

async function createTask (ctx: Context) {
  const payload = ctx.request.body as TaskInputDTO
  const newTask = new Task({
    id: nanoid(),
    ...payload
  })
  const response = await newTask.save()
  ctx.body = response
}

function updateTask (ctx: Context) {
  ctx.body = 'Update a task'
}

function deleteTask (ctx: Context) {
  ctx.body = 'Delete a task'
}

export default {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}
