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
