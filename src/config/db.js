const dbConfig = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
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
