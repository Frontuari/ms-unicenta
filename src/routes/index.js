const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const syncController = require("../controllers/syncController");
module.exports = () => {
  router.get(
    "/orders/uncheckallorders",
    OrderController.uncheckAllOrdersExistError
  );

  router.get("/idempiere/sync/taxes", syncController.syncTaxes);
  router.get("/idempiere/sync/payments", syncController.syncTypePayments);
  router.get("/idempiere/sync/uoms", syncController.syncUoms);
  return router;
};
