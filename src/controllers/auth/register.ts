import { ValidationError } from 'joi'
import { Context } from 'koa'
import type { MongoServerError } from 'mongodb'
import { nanoid } from 'nanoid'
import { UserCreateDTO } from '../../@types/dto'
import { authRegisterSchema } from '../../schemas/authschemas'
import User from '../../models/User'
import ServiceError from '../../errors/ServiceError'
import { hashPassword } from '../../utils/bcrypt'

async function register (ctx: Context) {
  const payload = ctx.request.body as UserCreateDTO

  try {
    const validated: UserCreateDTO = await authRegisterSchema.validateAsync(payload)

    const hashedPassword = await hashPassword(validated.password)
    const newUser = new User({
      id: nanoid(),
      ...validated,
      password: hashedPassword
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

export default register
