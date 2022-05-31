module.exports = (sequelize, DataTypes) => {
  const TicketLines = sequelize.define(
    "ticketlines",
    {
      ticket: {
        type: DataTypes.STRING,
      },
      line: {
        type: DataTypes.INTEGER,
      },
      product: {
        type: DataTypes.STRING,
      },
      attributesetinstance_id: {
        type: DataTypes.BIGINT,
      },
      units: {
        type: DataTypes.DOUBLE,
      },
      price: {
        type: DataTypes.DOUBLE,
      },
      taxid: {
        type: DataTypes.BIGINT,
      },
      attributes: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false },
    { freezeTableName: true }
  );
  TicketLines.removeAttribute("id");

  TicketLines.associate = (models) => {
    TicketLines.belongsTo(models.tickets, {
      as: "tickets",
      foreignKey: "ticket",
      targetKey: "id",
    });
    TicketLines.belongsTo(models.products, {
      as: "products",
      foreignKey: "product",
      targetKey: "id",
    });
  };

  return TicketLines;
};
