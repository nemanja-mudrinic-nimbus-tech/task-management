# Intro and general

## What is Task Management

TM is small light-weight project to handle user's task (aka todos).

# How to start project locally

There two ways of starting this project

This project was time scoped so its missing few infrastructure setups, so we are recommending running project like this

Before we start make sure that you have Docker installed and up & running

1. Setup node version using nvm (if you dont have install one)
```
$ nvm use
```

2. Install all dependecies (since we are using TurboRepo we can do it from root level)
```
$ yarn
```

3. Starting up database, this will start mongodb database, all information can be found inside ```docker-compose.yml```
```
$ docker-compose up
```

4. Setting up env, to do this go inside ```/apps/api-server```, ```/apps/client```, ```/packages/api``` and execute

```
$ cp .env.example .env
```
Fill out missing values by your wish!
  1. apps/api-server
      ```MONGO_PASSWORD, JWT_SECRET```
  2. apps/client (there are predefined values, but feel free to change)
     ```VITE_BASE_API_URL```
  3. packages/api
     ```SWAGGER_PASSWORD```
   
5. We need to spin up backend first, since we need to have swagger up and running - so that our frontend can generate files. Enter ```api-server``` directory
Note: Because of esbuild we also need to do a build inside ```packages/result```
```
$ cd packages/result
$ yarn && yarn build
```
Now we can start backend
```
yarn dev
```

This will start server at port that you have used as env value

To generate frontend values go to ```/packages/api``` and run ```yarn generate```

Now we can start everything using ```yarn dev``` on root level or inside each of apps (client and api-server)

# Technical decisions

- TurboRepo
  - Making life easier for handling external packages (private) that could be published in future as standalone packages
  - There is downside with it - regarding docker

- UI Kit
  - Instead of creating UI Kit supported with storybook (which is intended), this project is taking advantage of PrimeReact UI libary which is stored inside ```src/components```

- Generating Swagger / Generating Service layer on client
  - Currently we are taking benefits of zod + swagger npm libs that allows us
    - To build Types from validation schemas
    - To build Swagger content based on validaiton and *.openapi.ts files - we look this as source of truth
    - Client is downloading swagger content to generate request/response types and service layer
  All of this gives us single source of truth that can be easily controlled

- Splitting backend into modules
  - Gives us head start to split to microservices if its necessary

- Abstraction layer around Repositories
  - Give us more control if we change ORM/ORD or database in future

- Testing
  - Currently there are test only for service and dto layer using jest

# Service Docs

This section contains relevant links that contains all technicals plans and current decision that are not mention in section above

- [Client](./client.md)
- [Server](./server.md)



