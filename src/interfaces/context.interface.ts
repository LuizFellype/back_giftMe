import { Prisma } from '../generated/prisma'

/**
 * @description Interface context for the database and the requisitions.
 * @author David Vilaça
 * @date 2019-01-15
 * @export
 * @interface Context
 */
export interface Context {
  db: Prisma
  request: any
}
