import { ValidationError } from 'joi'
import { Context } from 'koa'
import { nanoid } from 'nanoid'
import ServiceError from '../errors/ServiceError'
import { SuscriptionInputDTO } from '../@types/dto'
import Suscription from '../models/Suscription'
import { suscriptionCreateSchema, suscriptionUpdateSchema } from '../schemas/suscription.schemas'

async function getAllSuscriptions (ctx: Context) {
  const userId = ctx.state.user.id
  const suscriptions = await Suscription.find({ userId })
  const jsonSuscriptions = suscriptions.map(suscription => suscription.toJSON())
  ctx.body = jsonSuscriptions
}

async function getSuscription (ctx: Context) {
  const id = ctx.params.id as string
  const userId = ctx.state.user.id

  const suscription = await Suscription.findOne({ id, userId })

  if (suscription) {
    ctx.body = suscription
  } else {
    ctx.status = 404
  }
}

async function createSuscription (ctx: Context) {
  const payload = ctx.request.body as SuscriptionInputDTO
  const userId = ctx.state.user.id

  try {
    const validated: SuscriptionInputDTO = await suscriptionCreateSchema.validateAsync(payload)

    const newSuscription = new Suscription({
      id: nanoid(),
      ...validated,
      userId
    })
    const response = await newSuscription.save()
    ctx.body = response
    ctx.status = 201
  } catch (err) {
    const validationError = err as ValidationError
    if (validationError.isJoi) {
      throw new ServiceError(400, validationError.message)
    }
    throw err
  }
}

async function updateSuscription (ctx: Context) {
  const id = ctx.params.id as string
  const payload = ctx.request.body as Partial<SuscriptionInputDTO>
  const userId = ctx.state.user.id

  if (Object.values(payload).length === 0) {
    throw new ServiceError(400, 'No data to update')
  }

  try {
    const validated = await suscriptionUpdateSchema.validateAsync(payload)
    const updatedSuscription = await Suscription.findOneAndUpdate({
      id, userId }, validated, { new: true })
    if (updatedSuscription) {
      ctx.body = updatedSuscription.toJSON()
    } else {
      ctx.status = 404
    }
  } catch (err) {
    const validationError = err as ValidationError
    if (validationError.isJoi) {
      throw new ServiceError(400, validationError.message)
    }
  }
}

async function deleteSuscription (ctx: Context) {
  const id = ctx.params.id as string
  const userId = ctx.state.user.id
  await Suscription.findOneAndDelete({ id, userId })
  ctx.status = 204
}

export default {
  getAllSuscriptions,
  getSuscription,
  createSuscription,
  updateSuscription,
  deleteSuscription
}
