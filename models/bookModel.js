const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  author: {
    type: String,
    default: "Unknown",
    trim: true,
  },
  country: {
    type: String,
    trim: true,
    required: [true, "Country is required"],
  },
  imageLink: {
    type: String,
  },
  language: {
    type: String,
    trim: true,
    required: [true, "Language is required"],
  },
  link: {
    type: String,
  },
  pages: {
    type: Number,
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: (props) => `${props.value} is not a valid number!`,
    },
  },
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  year: {
    type: Number,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
