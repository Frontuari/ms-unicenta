const db = require("../models");

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

exports.recordProductCat = async () => {
  return await db.sequelize.query(
    `INSERT INTO products_cat SELECT id AS product, '1' as catorder FROM products WHERE NOT EXISTS (SELECT 1 FROM products_cat WHERE products.id = products_cat.product)`
  );
};
