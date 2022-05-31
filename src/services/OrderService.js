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

exports.getTicket = async (id) => {
  return await db.tickets.findOne({
    where: {
      ticketid: id,
      tickettype: "0",
    },
  });
};

exports.getTicketWithDetail = async (id) => {
  return await db.tickets.findOne({
    where: {
      ticketid: id,
      tickettype: "0",
    },
    include: { all: true },
  });
};

exports.getNewReturnsOrders = async () => {
  return await db.tickets.findAll({
    where: {
      IsImported: "N",
      exist_error: "N",
      tickettype: "1",
    },
    include: { all: true },
    order: [["ticketid", "ASC"]],
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
