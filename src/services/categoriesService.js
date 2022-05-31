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
  const ProductsCat = await db.products_cat.findOne({ where: { product: product } });

  if (ProductsCat)
    return await db.products_cat.update(
      { product, catorder: "1" },
      { where: { product: product } }
    );
  else
    return await db.products_cat.create({
      product,
      catorder: "1",
    });
};