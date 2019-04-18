import { Context } from '../interfaces'
import { getUserId } from '../utils'

const query = {
  user: (parent: any, args: any, ctx: Context, info: any) => {
    const user = getUserId(ctx)
    return ctx.db.query.user(
      { where: { id: user.userId } },
      `{ id name products { id productName url } partner { name recognizeId products { id productName url } } }`
    )
  },

  feed: (parent: any, args: any, ctx: Context, info: any) => {
    const id = args.filterId
    if (!id) {
      throw new Error('Must be a filterId pararmeter')
    }

    return ctx.db.query.products(
      {
        where: { postedBy: { id } }
      },
      `{ id productName url createdAt postedBy { name } }`
    )
  }
}

export default query
