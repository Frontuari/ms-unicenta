db = require("../models");

exports.upsertPeople = async (data) => {
  console.log(data);
  process.exit(0);
  const People = await db.people.findOne({ where: { id: data.id } });

  if (People) return await db.people.update(data, { where: { id: data.id } });
  else return await db.people.create(data);
};
