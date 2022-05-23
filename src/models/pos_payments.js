module.exports = (sequelize, DataTypes) => {
  const posPayments = sequelize.define(
    "pos_payments",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      external_id: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      app: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
    },

    { timestamps: false, tableName: "ms_pos_payments", freezeTableName: true }
  );

  return posPayments;
};
