module.exports = (sequelize, DataTypes) => {
  const UOM = sequelize.define(
    "uom",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: false,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: "uom", freezeTableName: true }
  );
  //TicketLines.removeAttribute("id");
  /* TicketLines.associate = (models) => {
        TicketLines.belongsTo(models.carrito);
    };*/

  return UOM;
};
