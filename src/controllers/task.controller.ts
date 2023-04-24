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
  ctx.status = 201
}

async function updateTask (ctx: Context) {
  const id = ctx.params.id as string
  const payload = ctx.request.body as Partial<TaskInputDTO>
  const updatedTask = await Task.findOneAndUpdate({ id }, payload, { new: true })

  if (updatedTask) {
    ctx.body = updatedTask.toJSON()
  } else {
    ctx.status = 404
  }
}

async function deleteTask (ctx: Context) {
  const id = ctx.params.id as string
  await Task.findOneAndDelete({ id })
  ctx.status = 204
}

export default {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}
