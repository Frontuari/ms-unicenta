module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "categories",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      catshowname: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false, tableName: "categories", freezeTableName: true }
  );

  return Categories;
};
