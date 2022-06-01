const db = require("../models");

db = require("../models");

exports.upsertCategories = async (id, name) => {
  const Categorie = await db.categories.findOne({ where: { id: id } });
  if (Categorie)
    return await db.categories.update(
      { name, catshowname: "1" },
      { where: { id: id } }
    );
  else
    return await db.categories.create({
      id,
      name,
      catshowname: "1",
    });
};

exports.upsertProductsCategories = async (product) => {
  return await db.sequelize.query(
    `INSERT IGNORE INTO products_cat  values ( '${product}' , '1' )  `
  );
};
