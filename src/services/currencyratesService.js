db = require("../models");
const idempiereEnv = require("../config/idempiereEnv");
const dateTime = require("../utils/dateTime");

exports.create = async (data) => {
  return await db.currencyrates.create(data);
};

exports.upsertRate = async (rate, validto) => {
  const Rate = await db.currencyrates.findOne({
    where: {
      currency_id: idempiereEnv.CURRENCY_VE,
      currencyto_id: 100,
      validto: dateTime(validto),
    },
  });
  if (Rate)
    return await db.currencyrates.update(
      { rate },
      {
        where: {
          currency_id: idempiereEnv.CURRENCY_VE,
          currencyto_id: 100,
          validto: dateTime(validto),
        },
      }
    );
  else
    return await db.currencyrates.create({
      indicatorname: "Tasa Idempiere",
      currency_id: idempiereEnv.CURRENCY_VE,
      currencyto_id: 100,
      rate: rate,
      validto: dateTime(validto),
    });
};
