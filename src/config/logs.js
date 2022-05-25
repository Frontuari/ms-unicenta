const log4js = require("log4js");
log4js.configure({
  appenders: {
    sync: {
      type: "file",
      filename: "logs/sync.log",
    },
  },
  categories: {
    default: {
      appenders: ["sync"],
      level: "debug",
    },
  },
});

const logs = {
  logSync: log4js.getLogger("sync"),
  logRefreshToken: log4js.getLogger("refreshToken"),
  logNotification: log4js.getLogger("notification"),
};

module.exports = logs;
