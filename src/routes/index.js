const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const syncController = require("../controllers/syncController");
module.exports = () => {
  router.get(
    "/orders/uncheckallorders",
    OrderController.uncheckAllOrdersExistError
  );

  router.get("/sync/taxes", syncController.syncTaxes);
  return router;
};
