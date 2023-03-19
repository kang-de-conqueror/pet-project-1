# Test

## Description

A technical pet project using Node.js and Nest.js framework

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Flow usage (POSTMAN collection included)
```
Domain: localhost:3001/v1
```
- **Authenticate user**: /auth/github (You will receive an access token from the callback)
- **Use your token to authorize user**: Authorization: Bearer `{{token}}` (Put this into header)
- Access another APIs:
  - Get market cars: `GET: /market-cars`
  - Get market car by id: `GET: /market-cars/:id`
  - Create market car: `POST: /market-cars`
  - Update market car by id: `PATCH: /market-cars/:id`
