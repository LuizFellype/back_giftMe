import { Context } from '../interfaces'
import { getUserId } from '../utils'

const query = {
  user: (parent: any, args: any, ctx: Context, info: any) => {
    const user = getUserId(ctx)
    return ctx.db.query.user(
      { where: { id: user.userId } },
      `{ id name email recognizeId products { id productName url } partner { name email recognizeId products { id productName url } } }`
    )
  }
}

export default query
