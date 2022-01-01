# Express-Async-Logging
Logging with Winston and Async_hooks in Express and typescript

### NPMs required:

- Express - route handling
- http-status - status codes
- morgan - for logging
- winston - for logging
- typescript

you will also need the following dev dependencies:
- @types/express
- @types/morgan
- @types/node
- @types/uuid
- ts-node - run code without building

use ts-node as follows. The path to our app in this case is ./src/App.ts
```
"scripts": {
    "start": "ts-node ./src/App.ts",
```
You can run the app with: ** npm start **

This project will also utilize the context hook from
https://github.com/almerindo/traceability

which uses async_hook
