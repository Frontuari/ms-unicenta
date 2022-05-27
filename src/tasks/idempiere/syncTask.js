const cron = require("node-cron");
const taskService = require("../../services/taskService");
const syncOrderServices = require("../../services/idempiere/syncOrderService");
const syncReturnOrderService = require("../../services/idempiere/syncReturnOrderService");
const syncMasters = require("../../services/idempiere/syncMastersService");

const periodicity = require("../../config/task");
const logs = require("../../utils/logs");

exports.executeTaskSyncOrders = () => {
  cron.schedule(periodicity.getPeriodicity(), async () => {
    try {
      const process = await taskService.getProcess(1);

      logs.sync(`Job Invocado: ${new Date().toDateString()} `);

      if (process.actived == "0") {
        logs.sync(
          `Ejecucion de la tarea de sincronizacion de tickets: ${new Date().toDateString()} `,
          { type: "success", process: "job" }
        );
        await syncOrderServices.run();
      } else {
        logs.sync(
          `La tarea de sincronizacion de tickets ya se esta ejecutando ${new Date().toDateString()} `,
          { process: "job" }
        );
      }
    } catch (error) {
      logs.sync(error.message, { type: "error", process: "job" });
      logs.sync(`Error al ejecutar el Job  ${new Date().toDateString()}  `, {
        type: "error",
        process: "job",
      });
    }
  });
};

exports.executeTaskSyncReturnOrders = () => {
  cron.schedule(periodicity.getPeriodicity(), async () => {
    try {
      const process = await taskService.getProcess(2);

      if (process.actived == "0") {
        logs.sync(
          `Ejecucion de la tarea de sincronizacion de devolucion de tickets: ${new Date().toDateString()} `,
          { type: "success", process: "job" }
        );
        await syncReturnOrderService.run();
      } else {
        logs.sync(
          `La tarea de devolucion de tickets ya se esta ejecutando ${new Date().toDateString()} `,
          { process: "job" }
        );
      }
    } catch (error) {
      logs.sync(error.message, { type: "error", process: "job" });
      logs.sync(`Error al ejecutar el Job  ${new Date().toDateString()}  `, {
        type: "error",
        process: "job",
      });
    }
  });
};

exports.executeTaskImportTaxes = () => {
  cron.schedule(periodicity.getPeriodicityMasters(), async () => {
    logs.sync(
      `Ejecucion de la tarea de sincronizacion de impuestos: ${new Date().toDateString()} `
    );
    try {
      await syncMasters.runTaxes();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  });
};

exports.executeTaskImportTypePayments = () => {
  cron.schedule(periodicity.getPeriodicityMasters(), async () => {
    logs.sync(
      `Ejecucion de la tarea de sincronizacion de tipos de pago: ${new Date().toDateString()} `
    );
    try {
      await syncMasters.runPayments();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  });
};

exports.executeTaskImportUoms = () => {
  cron.schedule(periodicity.getPeriodicityMasters(), async () => {
    logs.sync(
      `Ejecucion de la tarea de sincronizacion de unidades de medida: ${new Date().toDateString()} `
    );
    try {
      await syncMasters.runUoms();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  });
};

exports.executeTaskImportPeople = () => {
  cron.schedule(periodicity.getPeriodicityMasters(), async () => {
    logs.sync(
      `Ejecucion de la tarea de sincronizacion de usuarios: ${new Date().toDateString()} `
    );
    try {
      await syncMasters.runPeople();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  });
};
