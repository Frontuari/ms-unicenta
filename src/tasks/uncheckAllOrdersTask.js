const cron = require("node-cron");

const orderService = require("../services/OrderService");
const periodicity = require("../config/task");
const logs = require("../utils/date");

exports.executeTask = () => {
  cron.schedule(periodicity.getPeriodicityUnCheckAllOrders(), async () => {
    console.log(
      "Ejecucion de la tarea de marcar todas las ordenes que tienen errores: ",
      new Date().toDateString()
    );
    try {
      await orderService.uncheckAllOrdersExistError();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  });
};
