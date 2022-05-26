const cron = require("node-cron");
const syncOrderServices = require("../../services/idempiere/syncOrderService");
const syncReturnOrderService = require("../../services/idempiere/syncReturnOrderService");
const syncMasters = require("../../services/idempiere/syncMastersService");

const periodicity = require("../../config/task");
const logs = require("../../utils/logs");

exports.executeTaskSyncOrders = () => {
  cron.schedule(periodicity.getPeriodicity(), async () => {
    logs.sync(
      `Ejecucion de la tarea de sincronizacion de tickets: ${new Date().toDateString()} `
    );
    try {
      await syncOrderServices.run();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  });
};

exports.executeTaskSyncReturnOrders = () => {
  cron.schedule(periodicity.getPeriodicity(), async () => {
    logs.sync(
      `Ejecucion de la tarea de sincronizacion de tickets: ${new Date().toDateString()} `
    );
    try {
      await syncReturnOrderService.run();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
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
