import { extractFragmentReplacements } from 'prisma-binding'
import Mutation from './mutation'
import Query from './query'

export const resolvers = { Query, Mutation }

export const fragmentReplacements = extractFragmentReplacements(resolvers)
