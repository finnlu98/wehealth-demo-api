# wehealth-demo-api

Project for streamlining data from norwegian weather alerts to the wehealth platform.

Project is built with Node, Express, SQLlite and Sequelizer

## Project setup

db - containing structure and migrations for db that keep tracks of changes to weatheralterts

server

- **models** to validate weather data and convert to wehealth structure
- **api-handler** handler to query weather alerts api
- **db-handler** handler to query db
- **scheduler** to determine when to query api`s and db
- **logger** to inform of actions

## To run server:

npm install

npm start
