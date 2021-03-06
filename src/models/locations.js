module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "locations",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: "locations", freezeTableName: true }
  );

  return Location;
};
