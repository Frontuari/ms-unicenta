db = require("../models");

exports.upsert = async (data) => {
  const Location = await db.locations.findOne({ where: { id: data.id } });

  if (Location)
    return await db.locations.update(data, { where: { id: data.id } });
  else return await db.locations.create(data);
};
