db = require("../models");

exports.upsertPeople = async (data) => {
  console.log(data);
  const People = await db.people.findOne({ where: { id: data.id } });

  if (People) return await db.people.update(data, { where: { id: data.id } });
  else return await db.people.create(data);
};

exports.upsertSalesRep = async (data) => {
  console.log(data);
  const SalesRep = await db.salesrep.findOne({ where: { id: data.id } });

  if (SalesRep) return await db.salesrep.update(data, { where: { id: data.id } });
  else return await db.salesrep.create(data);
};