const cron = require("node-cron");

const idempiereSyncOrderServices = require("../services/idempiere/syncOrderServices");
const periodicity = require("../config/task");

exports.executeTask = () => {
  cron.schedule(periodicity.getPeriodicity(), async () => {
    console.log("Start executing task at: ", new Date().toDateString());
    try {
      await syncOrderServices.run();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  });
};
