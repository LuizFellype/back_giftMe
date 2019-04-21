import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { Context } from '../interfaces'
import {
  APP_SECRET,
  getUserId,
  removePartnerUserConnection,
  uuid
} from '../utils'

const createId = () => uuid()

const mutation = {
  signup: async (parent: any, args: any, ctx: Context, info: any) => {
    const password = await bcrypt.hash(args.password, 10)
    return ctx.db.mutation.createUser(
      {
        data: { ...args, password, recognizeId: createId() }
      },
      info
    )
  },
  login: async (parent: any, args: any, ctx: Context, info: any) => {
    const user = await ctx.db.query.user(
      { where: { email: args.email } },
      `{ id name email password recognizeId products { id productName url } partner { recognizeId name email products { id productName url } } }`
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
  disconnect: async (parent: any, args: any, ctx: Context, info: any) => {
    const { userId } = getUserId(ctx)
    const userLogged = await ctx.db.query.user(
      { where: { id: userId } },
      `{ partner { recognizeId } }`
    )
    await removePartnerUserConnection(userLogged, ctx)

    await ctx.db.mutation.updateUser({
      data: { partner: { disconnect: true } },
      where: { id: userId }
    })
    return true
  },
  addPartner: async (
    parent: any,
    { recognizeId }: any,
    ctx: Context,
    info: any
  ) => {
    const { userId } = getUserId(ctx)

    // logged has patner && throw error warnning
    const userLogged = await ctx.db.query.user(
      { where: { id: userId } },
      `{ partner { recognizeId } }`
    )

    if ((userLogged || { partner: null }).partner) {
      throw new Error(`You are connected with someone else`)
    }

    // other has patner && throw error warnning
    const futurePartner = await ctx.db.query.user(
      { where: { recognizeId: recognizeId } },
      `{ partner { recognizeId } }`
    )
    if ((futurePartner || { partner: null }).partner) {
      throw new Error(`User already connected with someone else`)
    }

    // connect logged~other
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
    const { userId } = getUserId(ctx)
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
