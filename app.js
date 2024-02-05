const express = require("express");
const booksRouter = require("./routes/bookRoute");
const ordersRouter = require("./routes/orderRoute");
const cors = require("cors");
// Create server
const app = express();
app.use(cors());

// POST query, to get req.body. This is parser for POST, PATCH, PUT
app.use(express.json());

app.use("/api/v1/books", booksRouter);
app.use("/api/v1/orders", ordersRouter);

module.exports = app;