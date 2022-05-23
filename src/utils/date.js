const moment = require("moment");

module.exports = (date) => {
  if (!date) date = new Date();
  return moment(date).format("YYYY-MM-DD");
};
