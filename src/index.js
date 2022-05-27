require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const globalConfig = require("./config/global");
const syncTask = require("./tasks/idempiere/syncTask");
const taskUnCheckAllOrder = require("./tasks/uncheckAllOrdersTask");
const syncOrderServices = require("./services/idempiere/syncOrderService");
const syncReturnOrderService = require("./services/idempiere/syncReturnOrderService");
const syncMasters = require("./services/idempiere/syncMastersService");
const orderService = require("./services/OrderService");
const taskService = require("./services/taskService");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/", routes());

(async () => {
  try {
    await taskService.deactiveProcess(1);
    await taskService.deactiveProcess(2);

    if (globalConfig.SYNC_IDEMPIERE) {
      await orderService.uncheckAllOrdersExistError();
      await syncMasters.runPayments();
      await syncMasters.runTaxes();
      await syncMasters.runUoms();
      await syncMasters.runPeople();
      await syncOrderServices.run();
      await syncReturnOrderService.run();
    }
  } catch (error) {
    console.log(error);
  }
})();

taskUnCheckAllOrder.executeTask();
syncTask.executeTaskImportTaxes();
syncTask.executeTaskImportTypePayments();
syncTask.executeTaskImportUoms();
syncTask.executeTaskSyncOrders();

syncTask.executeTaskImportPeople();
syncTask.executeTaskSyncReturnOrders();

app.listen(globalConfig.port, () =>
  console.log("Server is up on port: ", globalConfig.port)
);
