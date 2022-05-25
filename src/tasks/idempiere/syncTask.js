const cron = require("node-cron");

const syncOrderServices = require("../../services/idempiere/syncOrderService");
const periodicity = require("../../config/task");
const logs = require("../../utils/date");

exports.executeTaskSyncOrders = () => {
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

exports.executeTaskImportTaxes = () => {
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
