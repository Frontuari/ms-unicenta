require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const globalConfig = require("./config/global");
//const task = require("./tasks/synchronization");
const idempiereSyncOrderServices = require("./services/idempiere/syncOrderServices");
const idempiereSyncPosPaymentService = require("./services/idempiere/syncPosPaymentService");
const app = express();
const { execSync } = require("child_process");

app.use(express.json());
app.use(cors());
app.use("/api/", routes());

(async () => {
  while (true) {
    console.log("before start");
    try {
      if (globalConfig.SYNC_IDEMPIERE)
        await idempiereSyncPosPaymentService.run();
      if (globalConfig.SYNC_IDEMPIERE) await idempiereSyncOrderServices.run();

      execSync(`sleep 30`);
      //if (globalConfig.SYNC_IDEMPIERE) await idempiereSyncOrderServices.run();
    } catch (error) {
      console.log(error);
    }
    console.log("after start");
  }
})();

app.listen(globalConfig.port, () =>
  console.log("Server is up on port: ", globalConfig.port)
);
