const express = require("express");

const orderController = require("../controllers/orderController");

const ordersRouter = express.Router();

const { getAllOrders, getOrderByID, postOrder, updateOrder, deleteOrder, checkBookIDs } =
  orderController;


ordersRouter.route("/").get(getAllOrders).post(checkBookIDs, postOrder);
ordersRouter
  .route("/:id")
  .get(getOrderByID)
  .patch(updateOrder)
  .delete(deleteOrder);

module.exports = ordersRouter;