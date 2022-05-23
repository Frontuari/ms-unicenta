const dbConfig = {
  username: "idempiere",
  password: "control1234**",
  database: "unicenta_backup_3",
  host: "165.227.197.236",
  dialect: "mysql",
  dialectOptions: { connectTimeout: 99000 },
  operatorsAliases: 0,
  pool: {
    max: 100,
    min: 0,
    idle: 910000,
  },
};

module.exports = dbConfig;
