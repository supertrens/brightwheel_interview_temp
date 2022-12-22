# Brightwheel Device Readings Interview Project

A simple express web API on Node 18.x writing in TypeScript that receives and
processes device readings.

## Prerequisites

- nvm/Node.js
  - <a href="https://github.com/nvm-sh/nvm" target="_blank">Install nvm</a>
  - Then use nvm to install Node.js (Node 18.x, latest):
    ```shell
    nvm install --lts
    ```

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

- Devices
  - `POST /devices` List all devices
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
  where we can hit the always hit the cache.
