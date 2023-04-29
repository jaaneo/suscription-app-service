import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  done: Boolean,
  userId: { type: String, required: true }
})

const Task = mongoose.model('Task', TaskSchema)

export default Task
