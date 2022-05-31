db = require("../models");

exports.create = async (data) => {
  return await db.currencyrates.create(data);
};
