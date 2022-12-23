## Installation

```bash
$ npm install
```
____________

## Testing the app

The tests executed here use mongo in memory, as soon as the test is started mongo in memory starts automatically (without the need to use a uri) and after all the tests are executed, mongo is finished.

```bash
# development mode
$ npm run test:e2e
```

____________

## Running the app

But if you want to start the project normally, you need to configure a local uri and a port where the server will be started.

### Env files for run your project

| NODE_ENV    | File                        |
| ----------- | --------------------------- |
| development | environment/development.env |

### Env vars

| Name                  | Type   |
| --------------------- | ------ |
| PORT                  | Number |
| MONGO_URI             | String |


### Running the app

```bash
# development mode
$ npm run start:dev
```

