module.exports = (sequelize, DataTypes) => {
  const UOM = sequelize.define(
    "uom",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: false,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: "uom", freezeTableName: true }
  );

  return UOM;
};
