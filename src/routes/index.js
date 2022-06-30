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
  router.get("/idempiere/sync/users", syncController.syncPeople);
  router.get("/idempiere/sync/salesrep", syncController.syncSalesRep);
  router.get("/idempiere/sync/locations", syncController.syncLocations);
  router.get("/idempiere/sync/products", syncController.syncProducts);
  return router;
};
