module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define(
    "customers",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
      },
      searchkey: {
        type: DataTypes.STRING,
      },
      taxid: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      taxcategory: {
        type: DataTypes.STRING,
      },
      card: {
        type: DataTypes.STRING,
      },
      maxdebt: {
        type: DataTypes.DOUBLE,
      },
      address: {
        type: DataTypes.STRING,
      },
      address2: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      region: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      firstname: {
        type: DataTypes.STRING,
      },
      lastname: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      phone2: {
        type: DataTypes.STRING,
      },
      fax: {
        type: DataTypes.STRING,
      },
      notes: {
        type: DataTypes.STRING,
      },
      visible: {
        type: DataTypes.STRING,
      },
      curdate: {
        type: DataTypes.DATE,
      },
      curdebt: {
        type: DataTypes.DATE,
      },
      isvip: {
        type: DataTypes.STRING,
      },

      discount: {
        type: DataTypes.DOUBLE,
      },

      memodate: {
        type: DataTypes.DATE,
      },
    },
    { timestamps: false },
    { freezeTableName: true }
  );

  Customers.associate = (models) => {
    Customers.hasMany(models.tickets, {
      as: "tickets",
      foreignKey: "customer",
      sourceKey: "id",
    });
  };

  return Customers;
};
