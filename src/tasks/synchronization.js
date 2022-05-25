const cron = require("node-cron");

const syncOrderServices = require("../services/idempiere/syncOrderServices");
const periodicity = require("../config/task");

exports.executeTask = () => {
  cron.schedule(periodicity.getPeriodicity(), async () => {
    console.log(
      "Ejecucion de la tarea de sincronizacion: ",
      new Date().toDateString()
    );
    try {
      await syncOrderServices.run();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  });
};
