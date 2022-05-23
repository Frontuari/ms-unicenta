module.exports = (sequelize, DataTypes) => {
  const Tickets = sequelize.define(
    "tickets",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      tickettype: {
        type: DataTypes.INTEGER,
      },
      ticketid: {
        type: DataTypes.INTEGER,
      },
      person: {
        type: DataTypes.INTEGER,
      },
      customer: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.INTEGER,
      },
      fiscalprinterno: {
        type: DataTypes.STRING,
      },
      serialprinter: {
        type: DataTypes.STRING,
      },
      nreport_z: {
        type: DataTypes.STRING,
      },
      IsImported: {
        type: DataTypes.STRING,
      },
      exist_error: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, freezeTableName: true }
  );

  Tickets.associate = (models) => {
    Tickets.hasMany(models.ticketlines, {
      as: "ticketlines",
      foreignKey: "ticket",
      sourceKey: "id",
    });

    Tickets.belongsTo(models.receipts, {
      as: "receipts",
      foreignKey: "id",
      targetKey: "id",
    });

    Tickets.belongsTo(models.customers, {
      as: "customers",
      foreignKey: "customer",
      targetKey: "id",
    });
  };

  return Tickets;
};
