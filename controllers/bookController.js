const Book = require("../models/bookModel");

// 1.
exports.getAllBooks = async (req, res) => {
  try {
    // destructuring the query object
    const { author, language, title } = req.query;
    // filter
    const filter = {};
    if (author) filter.author = author;
    if (language) filter.language = language;
    if (title) filter.title = { $regex: new RegExp(title, "i") };

    let query = Book.find(filter);

    // sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-author");
    }

    //   pagination
    if (req.query.page) {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      const skipValue = (page - 1) * limit;

      query = query.skip(skipValue).limit(limit);

      const booksCount = await Book.countDocuments();
      if (skipValue >= booksCount) {
        throw new Error("This page does not exist");
      }
    }

    const books = await query;

    res.status(200).json(books);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// 2.
exports.getBookByID = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// 3.

exports.postBook = async (req, res) => {
  const newData = await Book.create(req.body);
  try {
    res.status(201).json({
      status: "success",
      data: newData,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// 4.

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateBook = req.body;
    const book = await Book.findByIdAndUpdate(id, updateBook, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({
        status: "fail",
        message: "Book not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        data: book,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// 5.

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
