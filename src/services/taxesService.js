db = require("../models");

exports.upsertCategorie = async (id, name) => {
  return await db.taxcategory.upsert({
    id,
    name,
  });
};

exports.upsertTaxes = async (data) => {
  return await db.taxcategory.upsert(data);
};
