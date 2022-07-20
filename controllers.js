const { fail } = require("assert");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const books = JSON.parse(fs.readFileSync(`${__dirname}/data.txt`, "utf-8"));

exports.getAllBooks = (req, res) => {
  res.status(200).json({
    status: "success",
    results: books.length,
    data: books,
  });
};
exports.createBook = (req, res) => {
  const bookId = uuidv4();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  if (
    !req.body.title ||
    !req.body.author ||
    !req.body.year ||
    !req.body.genre
  ) {
    return res.status(400).json({
      status: "fail",
      message: "Missing title or author or year or genre.",
    });
  }
  const newBook = Object.assign({ id: bookId, createdAt, updatedAt }, req.body);
  books.push(newBook);
  fs.writeFile(`${__dirname}/data.txt`, JSON.stringify(books), () => {
    res.status(201).json({
      status: "success",
      data: newBook,
    });
  });
};
exports.updateBook = (req, res) => {
  const book = books.find((elem) => elem.id == req.params.id);
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  }
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((elem) => elem.id == req.params.id);
  const updatedBook = Object.assign(
    { createdAt: book.createdAt, id: book.id, updatedAt },
    req.body
  );
  books.splice(index, 1, updatedBook);
  fs.writeFile(`${__dirname}/data.txt`, JSON.stringify(books), () => {
    res.status(201).json({
      status: "success",
      data: updatedBook,
    });
  });
};
exports.deleteBook = (req, res) => {
  const book = books.find((elem) => elem.id == req.params.id);
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  }
  const index = books.findIndex((elem) => elem.id == req.params.id);
  books.splice(index, 1);
  fs.writeFile(`${__dirname}/data.txt`, JSON.stringify(books), () => {
    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};
exports.getBook = (req, res) => {
  const book = books.find((elem) => elem.id == +req.params.id);
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id",
    });
  }
  res.status(200).json({
    status: "success",
    data: book,
  });
};
