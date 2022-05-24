const db = require("../models");
const date = require("../utils/date");
const idempiereEnv = require("../config/idempiereEnv");

exports.getNewOrders = async () => {
  return await db.tickets.findAll({
    where: {
      IsImported: "N",
      exist_error: "N",
      tickettype: "0",
    },
    include: { all: true },
    order: [["ticketid", "ASC"]],
    // limit: idempiereEnv.RECORD_LIMIT,
  });
};

exports.getNewReturnsOrders = async () => {
  return await db.tickets.findAll({
    where: {
      IsImported: "N",
      exist_error: "N",
      tickettype: "1",
    },
    limit: idempiereEnv.RECORD_LIMIT,
  });
};

exports.getNewOrderLines = async (ticket) => {
  return await db.ticketlines.findAll({
    where: {
      ticket,
    },
    include: { all: true },
  });
};

exports.uncheckAllOrdersExistError = async () => {
  return await db.tickets.update(
    { exist_error: "N" },
    { where: { exist_error: "Y" } }
  );
};
