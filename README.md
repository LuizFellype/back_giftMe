**This is the backend of an app(GiftMe). The goals of the app is to know the present list of  your partner, so you could give whatever their wants.**

## Stack

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
ps: don't forget to double check your IP in docker container to match with PRISMA_ENDPOINT variable.

```terminal
$ docker-compose up -d
$ yarn prisma deploy
$ yarn dev
```
- And you should be able to go to http://localhost:3000/playground without errors.