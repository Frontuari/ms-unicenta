const { logSync } = require("../config/logs");
const db = require("../models");

exports.sync = (message, data) => {
  if (!data) data = {};
  if (!data.process) data.process = message;
  if (!data.logs) data.logs = "";
  if (!data.ticket) data.ticket = "";
  if (!data.type) data.type = "success";

  if (data.type == "error") {
    if (!data.logs) logSync.error(message);
  } else {
    logSync.info(message);
  }

  if (!data.deactive_messages) console.log(message);

  if (!data.deative_db) {
    saveLogInDB(data);
  }
};

const saveLogInDB = (data) => {
  db.logs
    .create({
      process: data.process,
      status: data.type,
      logs: data.logs,
      ticket_id: data.ticket,
    })
    .then(() => {})
    .catch((err) => {
      console.log("Error al cargar el registro en DB");
      logSync.error("Error al cargar el registro en DB");
      logSync.error(err);
      logSync.error({
        process: data.process,
        status: data.type,
        //logs: JSON.parse(JSON.stringify(data.logs)),
        ticket_id: data.ticket,
      });
    });
};
