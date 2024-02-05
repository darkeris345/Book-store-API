const Order = require("../models/orderModel");
const Book = require("../models/bookModel");

exports.checkBookIDs = async (req, res, next) => {
  const { booksID } = req.body;

  if (!booksID) {
    return res.status(400).json({
      status: "fail",
      message: "Something is wrong",
    });
  }

  try {
    const existingBooks = await Book.find({ _id: { $in: booksID } });

    if (existingBooks.length !== booksID.length) {
      const nonExistingBookIDs = booksID.filter(
        (id) => !existingBooks.some((book) => book._id.equals(id))
      );
      return res.status(400).json({
        status: "fail",
        message: `There is no book with ids [${nonExistingBookIDs.join(", ")}].`,
      });
    }

    // All book IDs are valid, proceed to the next middleware or route handler
    next();
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// 1.  Get all
exports.getAllOrders = async (req, res) => {
  try {
    // destructuring the query object
    const { status, orderedDate } = req.query;
    // filter
    const filter = {};
    if (status) filter.status = status;
    if (orderedDate) filter.orderedDate = orderedDate;

    //  gte, gt, lte, lt
    let queryString = JSON.stringify(filter);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query = Order.find(JSON.parse(queryString));

    const orders = await query.populate("booksID");

    res.status(200).json({
      status: "success",
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// 2. Get by ID
exports.getOrderByID = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// 3. Post
exports.postOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    await order.save();
    res.status(201).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// 4. Patch
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// 5. Delete
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data: "You have deleted the order",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};
