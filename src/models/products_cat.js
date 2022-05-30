module.exports = (sequelize, DataTypes) => {
  const ProductsCat = sequelize.define(
    "products_cat",
    {
      product: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      catorder: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: "products_cat", freezeTableName: true }
  );

  return ProductsCat;
};
