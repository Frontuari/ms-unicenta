db = require("../models");

exports.getTypePayment = (payment) => {
  const type = {
    bank: "TARJETA DE DEBITO",
    bank2: "TARJETA DE CREDITO",
    bankTransfer: "TRANSFERENCIA",
    cash: "EFECTIVO",
    cash_usd: "EFECTIVO",
    cashrefund: "Reembolso",
    debt: "CREDITO",
    slip: "ZELLE",
    "PAGO MOVIL": "Pago Móvil",
  };
  return type[payment];
};

exports.getTypePaymentByDescription = (payment) => {
  const type = {
    "TARJETA DE DÉBITO": "bank",
    "TARJETA DE CRÉDITO": "bank2",
    TRANSFERENCIA: "bankTransfer",
    EFECTIVO: "cash",
    "EFECTIVO USD": "cash_usd",
    Reembolso: "cashrefund",
    CRÉDITO: "debt",
    ZELLE: "slip",
    "PAGO MOVIL": "Pago Móvil",
  };
  return type[payment];
};

exports.getPaymentsForTicket = async (ticket) => {
  return await db.payments.findAll({
    where: {
      receipt: ticket,
    },
    include: { all: true },
  });
};

exports.getTypePosPayment = async (app) => {
  return await db.pos_payments.findAll({
    where: { app },
  });
};

exports.getTypePosPaymentByID = async (id, app) => {
  return await db.pos_payments.findOne({
    where: { id, app },
  });
};

exports.updateTypePosPayment = async (paymentType, data) => {
  return await db.pos_payments.update(data, { where: { id: paymentType } });
};
