const express = require("express");

const bookController = require("../controllers/bookController");

const booksRouter = express.Router();

const { getAllBooks, getBookByID, postBook, updateBook, deleteBook } =
  bookController;

booksRouter.route("/").get(getAllBooks).post(postBook);
booksRouter
  .route("/:id")
  .get(getBookByID)
  .patch(updateBook)
  .delete(deleteBook);

module.exports = booksRouter;
