const express = require("express");
const app = require("./app");
const controller = require("./controllers");

const bookRouter = express.Router();
bookRouter.get("/getAllBooks", controller.getAllBooks);
bookRouter.post("/createBook", controller.createBook);
bookRouter.put("/updateBook/:id", controller.updateBook);
bookRouter.delete("/deleteBook/:id", controller.deleteBook);
bookRouter.get("/getBook/:id", controller.getBook);

module.exports = bookRouter;
