module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define(
    "locations",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.INTEGER,
      },
      visible: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false, tableName: "locations", freezeTableName: true }
  );

  return People;
};
