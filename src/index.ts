import { config as dotEnvConfig } from 'dotenv'
import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from './generated/prisma'
import { fragmentReplacements, resolvers } from './resolvers'
import { envoriments } from './utils'

dotEnvConfig()

const db = new Prisma({
  fragmentReplacements,
  endpoint: envoriments.PRISMA_ENDPOINT,
  secret: envoriments.PRISMA_SECRET,
  debug: envoriments.isDev || envoriments.isStg
})

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({ ...req, db }),
  resolverValidationOptions: {
    requireResolversForResolveType: false
  }
})

server.start(
  {
    port: process.env.PORT || 4000,
    // logFunction: new Logger().logger,
    cors: {
      origin: envoriments.CORS_ORIGIN,
      methods: envoriments.CORS_METHODS,
      preflightContinue: false,
      optionsSuccessStatus: 204
    },
    debug: envoriments.isDev || envoriments.isStg
  },
  ({ port }) => console.log(`Server is running on http://localhost:${port}`)
)
