module.exports = (sequelize, DataTypes) => {
  const SalesRep = sequelize.define(
    "salesrep",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      dni: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: "salesrep", freezeTableName: true }
  );

  return SalesRep;
};
