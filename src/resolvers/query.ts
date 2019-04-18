import { Context } from '../interfaces'

const query = {
  user: (parent: any, { id }: any, ctx: Context, info: any) => {
    return ctx.db.query.user({ where: { id } }, info)
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
