# Brightwheel Device Readings Interview Project

A simple express web API on Node 18.x writing in TypeScript that receives and
processes device readings.

## System Requirements

- node `16 || 18`
- npm v8.16.0 or greater

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```shell
node --version
npm --version
```

If they are not installed on your system, you can :

- <a href="https://github.com/nvm-sh/nvm" target="_blank">Install nvm</a>
  - Then use nvm to install Node.js (Node 18.x, latest):
    ```shell
    nvm install --lts
    ```

## Running the app

To install required npm packages:

```shell
npm install
```

To run locally:

```shell
npm run start:local
```

To develop locally:

```shell
npm run start:dev
```

To run on prod

```shell
npm run build
npm start
```

To run test

```shell
npm run build
npm test
```

### Brightwheel Interview API endpoints
`base_url http://localhost:3000/v1`

- Devices

  - `POST /devices` Create/Update a device entry
    - body example:

  ```json
  {
    "id": "36d5658a-6908-479e-887e-a949ec199272",
    "readings": [
      {
        "timestamp": "2021-09-29T16:08:15+01:00",
        "count": 2
      },
      {
        "timestamp": "2021-09-29T16:09:15+01:00",
        "count": 15
      }
    ]
  }
  ```

  - `GET /devices/:deviceId` Find a device
  - `GET /devices/:deviceId/cumulative` show the total reading for a device
  - `GET /devices/:deviceId/latest` show the latest read time for a device

### Improvements (Todos)

Must

- Add authentication/authorization in front of above endpoints so that we could
  scope user access.
- Improve error handling. We currently have basic NOT_FOUND error in some
  handlers but all other errors are catch through a global catch that will
  return 500.
- Improve request validation. For now we have basic validation that check the
  body on `POST /devices`
- Improve test coverage. For now we only have basic "happy path" coverage for
  the units and integration tests.

Improvement

- To fullfil the project requirements, I followed the response pattern expected.
  However, before moving to production we should have a standarize response
  format. For now the API return value can take different shape such as:

  - `{data: {...}}`
  - `{key: value}`
  - `{}`

- `GET /devices/:deviceId/cumulative` and `GET /devices/:deviceId/latest` might
  be expensive operation. It would be a good idea to implement some caching
  strategies write-through with a read-through cache to set the latest reading
  and the cumulative read value in-memory on `POST /devices` . Like this we
  would always have those values pre-compute for all the subsequent request
  where always hit the cache.
- Set an in memory db (example: redis) that will write to a persistent db such as postgres
- Dockerize the application to facilitate smoother onboarding

## Project Structure

- `src/`

  - `__tests__/` e2e test suites for all the endpoints
  - `handlers/` the "service" handlers. The only place we interact with the db.
    The controller can consume those handlers to respond to the requests.
  - `utils\`
    - `__tests__\` unit test for files in this module
    - `db.ts` Our in memory DB implementation
    - `helpers.ts` functions that help us fulfill the request
    - `interface.ts` common interface
    - `validation.ts` validation function
  - `router.ts` The device router where we can find all allowed endpoints
  - `server.ts` We init and configure the app in this file. This is where we add
    the global middleware for logging / body parser etc...

- We also have a couple of root files to configure toolings:
  - `jest.config.js` for jest (testing)
  - `tsconfig.json` for compiling/transpaling (TS to JS)
  - `tslint.json` some linting rules to keep the codebase unify
