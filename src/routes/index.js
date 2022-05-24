const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");

module.exports = () => {
  router.get(
    "/orders/uncheckallorders",
    OrderController.uncheckAllOrdersExistError
  );
  return router;
};
