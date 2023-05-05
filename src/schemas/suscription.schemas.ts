import Joi from 'joi'

const suscriptionBaseSchema = {
  name: Joi.string(),
  description: Joi.string(),
  datePayment: Joi.string(),
  image: Joi.string(),
  amount: Joi.string(),
  done: Joi.boolean()
}

export const suscriptionCreateSchema = Joi.object({
  ...suscriptionBaseSchema,
  name: Joi.string().required()
})

export const suscriptionUpdateSchema = Joi.object(suscriptionBaseSchema).required()
