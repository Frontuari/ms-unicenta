module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define(
    "tasks",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      actived: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: "ms_tasks", freezeTableName: true }
  );

  return Tasks;
};
