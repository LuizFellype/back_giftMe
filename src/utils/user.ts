import * as jwt from 'jsonwebtoken'
import { Context } from '../interfaces'

export const APP_SECRET = 'GraphQL-is-aw3some'

export const uuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
    let random = (Math.random() * 16) | 0
    let value = char === 'x' ? random : (random % 4) + 8
    return value.toString(16)
  })
}

export const getUserId = (ctx: Context): any => {
  const authorization = ctx.request.get('Authorization')
  if (authorization) {
    const token = authorization.replace('Bearer ', '')
    const userId = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

export const removePartnerUserConnection = async (user: any, ctx: Context) => {
  if (!user) {
    throw new Error('No such user found')
  }

  const partnerRecognizeId = user.partner && user.partner.recognizeId

  if (partnerRecognizeId) {
    await ctx.db.mutation.updateUser(
      {
        data: { partner: { disconnect: true } },
        where: { recognizeId: partnerRecognizeId }
      },
      `{ name }`
    )
  }
}
