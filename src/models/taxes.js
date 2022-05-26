module.exports = (sequelize, DataTypes) => {
  const Taxes = sequelize.define(
    "taxes",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
      rate: {
        type: DataTypes.DOUBLE,
      },
    },
    { timestamps: false, tableName: "taxes", freezeTableName: true }
  );

  return Taxes;
};
