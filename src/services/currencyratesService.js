db = require("../models");

exports.create = async (data) => {
  return await db.currencyrates.create(data);
};


exports.upsertRate = async (rate, validto) => {
  const Rate = await db.currencyrates.findOne({ where: { currency_id: 1000000, currencyto_id: 100, validto: validto } });
  if (Rate)
    return await db.currencyrates.update(
      { rate },
      { where: { currency_id: 1000000, currencyto_id: 100, validto: validto } }
    );
  else
    return await db.currencyrates.create({
      indicatorname: "Tasa Idempiere",
      currency_id: 1000000,
      currencyto_id: 100,
      rate: rate,
      validto: validto,
    });
};