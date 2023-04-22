import { Context } from 'koa'

function getAllTasks (ctx: Context) {
  ctx.body = 'Get all taks'
}

function getTask (ctx: Context) {
  ctx.body = 'Get task'
}

function createTask (ctx: Context) {
  ctx.body = 'Create a new task'
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
