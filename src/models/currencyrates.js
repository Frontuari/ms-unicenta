module.exports = (sequelize, DataTypes) => {
  const Currencyrates = sequelize.define(
    "currencyrates",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      indicatorname: {
        type: DataTypes.STRING,
      },
      currency_id: {
        type: DataTypes.DOUBLE,
      },
      currencyto_id: {
        type: DataTypes.DOUBLE,
      },
      rate: {
        type: DataTypes.DOUBLE,
      },
      validto: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: "currencyrates", freezeTableName: true }
  );

  return Currencyrates;
};
