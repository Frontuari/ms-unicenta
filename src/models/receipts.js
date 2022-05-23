module.exports = (sequelize, DataTypes) => {
  const Receipts = sequelize.define(
    "receipts",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      money: {
        type: DataTypes.STRING,
      },
      datenew: {
        type: DataTypes.DATE,
      },
    },
    { timestamps: false, tableName: "receipts", freezeTableName: true }
  );
  //TicketLines.removeAttribute("id");
  Receipts.associate = (models) => {
    /*Receipts.belongsTo(models.ticket, {
      as: "tickets",
      foreignKey: "id",
      targetKey: "id",
    });*/

    Receipts.hasMany(models.payments, {
      as: "payments",
      foreignKey: "receipt",
      sourceKey: "id",
    });
  };

  return Receipts;
};
