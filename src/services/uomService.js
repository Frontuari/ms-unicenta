db = require("../models");

exports.upsertUOM = async (id, name) => {
  const UOM = await db.uom.findOne({ where: { id } });

  if (UOM) return await db.uom.update({ id, name }, { where: { id } });
  else
    return await db.uom.create({
      id,
      name,
    });
};
