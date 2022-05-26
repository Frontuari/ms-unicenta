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

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/", routes());

(async () => {
  try {
    if (globalConfig.SYNC_IDEMPIERE) {
      //await syncMasters.runPayments();
      //await syncMasters.runTaxes();
      //  await syncMasters.runUoms();
      // await syncMasters.runPeople();
      await syncOrderServices.run();
      //await syncReturnOrderService.run();
    }
  } catch (error) {
    console.log(error);
  }
})();

// taskUnCheckAllOrder.executeTask();
// syncTask.executeTaskImportTaxes();
// syncTask.executeTaskImportTypePayments();
// syncTask.executeTaskSyncOrders();
//syncTask.executeTaskImportUoms();
//syncTask.executeTaskImportPeople();
//syncTask.executeTaskSyncReturnOrders();

app.listen(globalConfig.port, () =>
  console.log("Server is up on port: ", globalConfig.port)
);
