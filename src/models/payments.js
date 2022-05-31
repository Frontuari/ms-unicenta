module.exports = (sequelize, DataTypes) => {
  const Payments = sequelize.define(
    "payments",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      receipt: {
        type: DataTypes.STRING,
      },
      payment: {
        type: DataTypes.STRING,
      },
      total: {
        type: DataTypes.DOUBLE,
      },
      tip: {
        type: DataTypes.DOUBLE,
      },
      transid: {
        type: DataTypes.BIGINT,
      },
      isprocessed: {
        type: DataTypes.INTEGER,
      },
      returnmsg: {
        type: DataTypes.STRING,
      },
      notes: {
        type: DataTypes.STRING,
      },
      tendered: {
        type: DataTypes.DOUBLE,
      },
      cardname: {
        type: DataTypes.STRING,
      },
      voucher: {
        type: DataTypes.STRING,
      },
      reference: {
        type: DataTypes.STRING,
      },
      bankto: {
        type: DataTypes.STRING,
      },
      bankfrom: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: "payments", freezeTableName: true }
  );

  Payments.associate = (models) => {
    Payments.belongsTo(models.receipts, {
      as: "receipts",
      foreignKey: "receipt",
      targetKey: "id",
    });
    Payments.belongsTo(models.pos_payments, {
      as: "pos_payments",
      foreignKey: "payment",
      targetKey: "id",
    });
  };

  return Payments;
};
