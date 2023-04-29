import Joi from 'joi'

const taskBaseSchema = {
  title: Joi.string(),
  description: Joi.string(),
  done: Joi.boolean()
}

export const taskCreateSchema = Joi.object({
  ...taskBaseSchema,
  title: Joi.string().required()
})

export const taskUpdateSchema = Joi.object(taskBaseSchema).required()
