const express = require("express")
const path = require('path');
const userRoutes = require("./src/routes/user.routes")
require("dotenv").config()

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'src', 'views'));

app.use("/api/v1",userRoutes)

const PORT = process.env.PORT

app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`);
})