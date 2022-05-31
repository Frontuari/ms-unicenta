module.exports = (sequelize, DataTypes) => {
  const Logs = sequelize.define(
    "logs",
    {
      process: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      logs: {
        type: DataTypes.STRING,
      },
      ticket_id: {
        type: DataTypes.STRING,
      },
    },

    { timestamps: false, tableName: "ms_logs", freezeTableName: true }
  );
  Logs.removeAttribute("id");
  /* TicketLines.associate = (models) => {
        TicketLines.belongsTo(models.carrito);
    };*/

  return Logs;
};
