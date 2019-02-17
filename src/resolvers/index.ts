import * as _ from 'lodash'
import { extractFragmentReplacements } from 'prisma-binding'
import { Context } from '../interfaces'

export const resolvers = {
  Query: {
    hello: (parent: any, args: any, ctx: Context, info: any) => {
      return 'Hello World'
    }
  }
}

export const fragmentReplacements = extractFragmentReplacements(resolvers)
