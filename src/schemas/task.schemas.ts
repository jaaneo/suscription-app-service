import Joi, { boolean } from 'joi'

const taskBaseSchema = {
  title: Joi.string(),
  description: Joi.string(),
  done: boolean()
}

export const taskCreateSchema = Joi.object({
  ...taskBaseSchema,
  title: Joi.string().required()
})

export const taskUpdateSchema = Joi.object(taskBaseSchema)
