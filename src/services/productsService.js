db = require("../models");

exports.upsert = async (data) => {
  const Product = await db.products.findOne({ where: { id: data.id } });

  if (Product)
    return await db.products.update(data, { where: { id: data.id } });
  else return await db.products.create(data);
};

exports.create = async (data) => {
  return await db.products.create(data);
};

exports.update = async (data) => {
  return await db.products.update(data, { where: { id: data.id } });
};

exports.createStock = async (data) => {
  return await db.stockcurrent.create(data);
};

exports.updateStock = async (data) => {
  return await db.stockcurrent.update(data, { where: { location: data.location, product: data.product } });
};
