import { Context } from 'koa'
import { TaskInputDTO } from '../@types/dto'
import Task from '../models/Task'

function getAllTasks (ctx: Context) {
  ctx.body = 'Get all taks'
}

function getTask (ctx: Context) {
  ctx.body = 'Get task'
}

async function createTask (ctx: Context) {
  const payload = ctx.request.body as TaskInputDTO
  const newTask = new Task(payload)
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
