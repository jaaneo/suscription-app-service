import mongoose from 'mongoose'

const SuscriptionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  description: String,
  datePayment: String,
  image: String,
  amount: String,
  done: Boolean,
  userId: { type: String, required: true }
})

const Suscription = mongoose.model('Suscription', SuscriptionSchema)

export default Suscription
