import { Context } from '../interfaces'
import { getUserId, INFOS } from '../utils'

const query = {
  user: (parent: any, args: any, ctx: Context, info: any) => {
    const user = getUserId(ctx)
    return ctx.db.query.user({ where: { id: user.userId } }, INFOS.USER)
  }
}

export default query
