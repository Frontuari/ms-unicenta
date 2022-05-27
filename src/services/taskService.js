db = require("../models");

exports.activeProcess = async (id) => {
  return await db.tasks.update({ actived: "1" }, { where: { id } });
};

exports.deactiveProcess = async (id) => {
  return await db.tasks.update({ actived: "0" }, { where: { id } });
};

exports.getProcess = async (id) => {
  return await db.tasks.findOne({ where: { id } });
};
