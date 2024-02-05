const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  orderedDate: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    validate: {
      validator: function (v) {
        return v > 0;
      },
      message: (props) => `${props.value} is not a valid number!`,
    },
    default: 1,
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "completed", "approved"],
      message:
        "{VALUE} is not supported. Please use: pending, completed, approved",
    },
  },
  booksID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
