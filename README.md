# ABOUT THIS APP

This is backend and frontend using ejs for Loom integration using jwt auth.

I have used Node.js, Express.js, PostgreSql, jsonwebtoken, Loom, ejs in this app.

# ROUTES

ACCESS LOOM
http://localhost:5000/api/v1/  GET ROUTE (PRIVATE ROUTE) FOR LOOM

LOGIN
http://localhost:5000/api/v1/login  POST ROUTE (PUBLIC ROUTE)

REGISTER
http://localhost:5000/api/v1/register  POST ROUTE (PUBLIC ROUTE)

ACCESS LOOM
http://localhost:5000/api/v1/record  GET ROUTE (PRIVATE ROUTE) FOR LOOM


# TO RUN THIS PROJECT
### `clone the repo`
then
### `npm install`
then
### `add .env file in root directory. Variables are (PORT, PGHOST, PGPASSWORD,PGDATABASE, PGUSER, PGSSLMODE,  JWT_SECRET, APP_ID, PRIVATE_KEY)`
### `npm run dev` 
Runs the app in the development mode.
### `npm start`
Runs the app in the production mode.
