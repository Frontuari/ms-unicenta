const globalConfig = {
  port: process.env.PORT || 4000,
  SYNC_IDEMPIERE: process.env.SYNC_IDEMPIERE == "Y",
  SYNC_ERPNEXT: process.env.SYNC_ERPNEXT == "Y",
};

module.exports = globalConfig;
