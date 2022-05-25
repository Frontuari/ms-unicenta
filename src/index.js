require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const globalConfig = require("./config/global");
const syncTask = require("./tasks/idempiere/syncTask");
const taskUnCheckAllOrder = require("./tasks/uncheckAllOrdersTask");
const syncOrderServices = require("./services/idempiere/syncOrderService");
const syncPosPaymentService = require("./services/idempiere/syncPosPaymentService");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/", routes());

(async () => {
  try {
    if (globalConfig.SYNC_IDEMPIERE) await syncPosPaymentService.run();
    if (globalConfig.SYNC_IDEMPIERE) await syncOrderServices.run();
  } catch (error) {
    console.log(error);
  }
})();

syncTask.executeTaskSyncOrders();
taskUnCheckAllOrder.executeTask();

app.listen(globalConfig.port, () =>
  console.log("Server is up on port: ", globalConfig.port)
);
