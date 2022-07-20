const express = require("express");
const bookRouter = require("./routers");
const app = express();

//MIDDLEWARE
app.use(express.json());
app.use("/", bookRouter);

module.exports = app;
