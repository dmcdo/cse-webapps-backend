This is the backend component of a To-Do app for CSE4234. The associated frontend component can be found at [https://github.com/dmcdo/cse-webapps-webapp](https://github.com/dmcdo/cse-webapps-webapp).

To run this express server you must point it to a running mongodb instance using the `MONGODB_URL` environment variable, as well as the database to use with `MONGODB_DB`. You can also specify the port for the express server to use by specifying the `EXPRESS_PORT` environment variable. If `EXPRESS_PORT` is undefined, port 8000 will be used.

Example .env file:
```
MONGODB_URL  = mongodb://127.0.0.1:27017
MONGODB_DB   = cse-todo-app
EXPRESS_PORT = 8000
```

The server can be started with
```sh
npm start
```
or, for development purposes:
```sh
nodemon src/server.js
```
