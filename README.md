## Stack starter

- Postgres
- Prisma
- GraphQL

## Steps to start

```terminal
$ git clone git@github.com:xdevelsistemas/graphql-starter.git PROJECT_NAME
$ cd PROJECT_NAME
$ yarn
```
- create a `.env` file with the same content as the `.env.example`
```terminal
$ docker-compose up -d
$ yarn prisma deploy
$ yarn dev
```
- And you should be able to go to http://localhost:3000/playground without errors.