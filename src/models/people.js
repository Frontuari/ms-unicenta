module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define(
    "people",
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
    { timestamps: false, tableName: "people", freezeTableName: true }
  );

  return People;
};
