module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      reference: {
        type: DataTypes.STRING,
      },
      code: {
        type: DataTypes.STRING,
      },
      codetype: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      pricebuy: {
        type: DataTypes.DOUBLE,
      },
      pricesell: {
        type: DataTypes.DOUBLE,
      },
      category: {
        type: DataTypes.STRING,
      },
      taxcat: {
        type: DataTypes.STRING,
      },
      attributeset_id: {
        type: DataTypes.BIGINT,
      },
      stockcost: {
        type: DataTypes.DOUBLE,
      },
      stockvolume: {
        type: DataTypes.DOUBLE,
      },

      iscom: {
        type: DataTypes.INTEGER,
      },
      isscale: {
        type: DataTypes.INTEGER,
      },

      isconstant: {
        type: DataTypes.INTEGER,
      },

      printkb: {
        type: DataTypes.INTEGER,
      },

      isscale: {
        type: DataTypes.INTEGER,
      },

      sendstatus: {
        type: DataTypes.INTEGER,
      },

      isservice: {
        type: DataTypes.INTEGER,
      },

      isvprice: {
        type: DataTypes.INTEGER,
      },
      isverpatrib: {
        type: DataTypes.INTEGER,
      },
      texttip: {
        type: DataTypes.STRING,
      },
      stockunits: {
        type: DataTypes.DOUBLE,
      },
      printto: {
        type: DataTypes.INTEGER,
      },

      supplier: {
        type: DataTypes.STRING,
      },
      uom: {
        type: DataTypes.BIGINT,
      },
      memodate: {
        type: DataTypes.DATE,
      },
      plucode: {
        type: DataTypes.STRING,
      },
      priceusdsale: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false },
    { freezeTableName: true }
  );

  Products.associate = (models) => {
    Products.hasMany(models.ticketlines, {
      as: "ticketlines",
      foreignKey: "product",
      sourceKey: "id",
    });
  };

  return Products;
};
