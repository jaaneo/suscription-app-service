import { ValidationError } from 'joi'
import { Context } from 'koa'
import type { MongoServerError } from 'mongodb'
import { nanoid } from 'nanoid'
import { UserCreateDTO, UserLoginRequestDTO } from '../@types/dto'
import { authLoginSchema, authRegisterSchema } from '../schemas/authschemas'
import ServiceError from '../errors/ServiceError'
import User from '../models/User'

async function register (ctx: Context) {
  const payload = ctx.request.body as UserCreateDTO

  try {
    const validated: UserCreateDTO = await authRegisterSchema.validateAsync(payload)

    const newUser = new User({
      id: nanoid(),
      ...validated
    })
    const response = await newUser.save()
    ctx.body = response
    ctx.status = 201
  } catch (err) {
    const validationError = err as ValidationError
    if (validationError.isJoi) {
      throw new ServiceError(400, validationError.message)
    }
    const mongoError = err as MongoServerError
    if (mongoError.code === 11000) {
      throw new ServiceError(409, 'User already exists')
    }
    throw err
  }
}

async function login (ctx: Context) {
  const payload = ctx.request.body as UserLoginRequestDTO

  try {
    const validated: UserLoginRequestDTO = await authLoginSchema.validateAsync(payload)

    const userAccount = await User.findOne({ email: validated.email })

    if (!userAccount) {
      throw new ServiceError(401)
    }
    return userAccount
  } catch (err) {
    const validationError = err as ValidationError
    if (validationError.isJoi) {
      console.log(validationError.message)
      throw new ServiceError(400, 'Invalid credentials')
    }
    throw err
  }
}

export default {
  register,
  login
}
