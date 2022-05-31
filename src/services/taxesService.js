db = require("../models");

exports.upsertCategories = async (id, name) => {
  const TaxCategory = await db.taxcategories.findOne({ where: { id } });

  if (TaxCategory)
    return await db.taxcategories.update({ id, name }, { where: { id } });
  else
    return await db.taxcategories.create({
      id,
      name,
    });
};

exports.upsertTaxes = async (data) => {
  const Taxes = await db.taxes.findOne({ where: { id: data.id } });

  if (Taxes) return await db.taxes.update(data, { where: { id: data.id } });
  else return await db.taxes.create(data);
};
