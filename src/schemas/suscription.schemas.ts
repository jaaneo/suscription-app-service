import Joi from 'joi'

const suscriptionBaseSchema = {
  name: Joi.string(),
  description: Joi.string(),
  datePayment: Joi.string(),
  image: Joi.string(),
  type: Joi.string(),
  done: Joi.boolean()
}

export const suscriptionCreateSchema = Joi.object({
  ...suscriptionBaseSchema,
  title: Joi.string().required()
})

export const suscriptionUpdateSchema = Joi.object(suscriptionBaseSchema).required()
