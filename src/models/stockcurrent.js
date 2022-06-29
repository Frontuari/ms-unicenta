module.exports = (sequelize, DataTypes) => {
  const StockCurrent = sequelize.define(
    "stockcurrent",
    {
      product: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      location: {
        type: DataTypes.STRING,
      },
      attributesetinstance_id: {
        type: DataTypes.STRING,
      },
      units: {
        type: DataTypes.DOUBLE,
      },
    },
    { timestamps: false, tableName: "stockcurrent", freezeTableName: true }
  );

  return StockCurrent;
};
