module.exports = (sequelize, DataTypes) => {
  const TaxCategories = sequelize.define(
    "taxcategories",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: "taxcategories", freezeTableName: true }
  );

  return TaxCategories;
};
