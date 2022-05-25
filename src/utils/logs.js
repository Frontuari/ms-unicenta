const { logSync } = require("../config/logs");
const db = require("../models");
var colors = require("colors");

exports.sync = (message, data) => {
  data = initData(data, message);

  if (data.type != "info") {
    saveLogInDB(data);
  }

  executeMessage(data, message);
};

const executeMessage = (data, message) => {
  console.log("\n");
  if (data.type == "error") {
    logSync.error(message);
    console.log(message.red);
  } else if (data.type == "warn") {
    logSync.warn(message);
    console.log(message.yellow);
  } else if (data.type == "success") {
    logSync.info(message);
    console.log(message.green);
  } else {
    logSync.info(message);
    console.log(message.blue);
  }
  console.log("\n");
  console.log("\n");
};

const initData = (data, message) => {
  if (!data) data = {};
  if (!data.process) data.process = message;
  if (!data.logs) data.logs = "";
  if (!data.ticket) data.ticket = "";
  if (!data.type) data.type = "info";
  return data;
};

const saveLogInDB = (data) => {
  db.logs
    .create({
      process: data.process,
      status: data.type,
      logs: transformToText(data.logs),
      ticket_id: data.ticket,
    })
    .then(() => {})
    .catch((err) => {
      console.log("Error al cargar el registro en DB");
      logSync.error("Error al cargar el registro en DB");
      logSync.error("Error al cargar el registro en DB");
      logSync.error(err);
      logSync.error({
        process: data.process,
        status: data.type,
        logs: transformToText(data.logs),
        ticket_id: data.ticket,
      });
    });
};

const transformToText = (logs) => {
  let text = "";
  if (Array.isArray(logs)) {
    text = logs.toString();
  } else if (logs instanceof Object) {
    text = JSON.stringify(logs);
  } else {
    text = logs.toString();
  }

  return text;
};
