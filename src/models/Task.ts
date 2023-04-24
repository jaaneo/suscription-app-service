import mongoose, { Schema } from 'mongoose'

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  done: Boolean
})

const Task = mongoose.model('Task', TaskSchema)

export default Task
