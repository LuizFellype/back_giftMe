import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { Context } from '../interfaces'

const { APP_SECRET, getUserId, uuid } = require('../utils')

const createId = () => uuid()

const mutation = {
  signup: async (parent: any, args: any, ctx: Context, info: any) => {
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser(
      {
        data: { ...args, password, recognizeId: createId() }
      },
      `{ id }`
    )
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
      token,
      user
    }
  },
  login: async (parent: any, args: any, ctx: Context, info: any) => {
    const user = await ctx.db.query.user(
      { where: { email: args.email } },
      ` { id password } `
    )
    if (!user) {
      throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return { token, user }
  },
  post: (parent: any, args: any, ctx: Context, info: any) => {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createProduct(
      {
        data: {
          url: args.url,
          productName: args.productName,
          postedBy: { connect: { id: userId } }
        }
      },
      info
    )
  },
  addPartner: async (
    parent: any,
    { recognizeId }: any,
    ctx: Context,
    info: any
  ) => {
    const userId = getUserId(ctx)
    await ctx.db.mutation.updateUser(
      {
        data: { partner: { connect: { id: userId } } },
        where: { recognizeId }
      },
      `{ name }`
    )
    return ctx.db.mutation.updateUser(
      {
        data: { partner: { connect: { recognizeId } } },
        where: { id: userId }
      },
      `{ partner { name recognizeId products { id productName url } } }`
    )
  },
  updateUser: (parent: any, args: any, ctx: Context, info: any) => {
    const userId = getUserId(ctx)
    return ctx.db.mutation.updateUser(
      {
        data: args,
        where: { id: userId }
      },
      info
    )
  }
}

export default mutation
