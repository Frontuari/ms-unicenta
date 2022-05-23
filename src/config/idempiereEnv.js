const idempiereConfig = {
  API_URL: process.env.API_URL_IDEMPIERE || "",
  ORG_ID: process.env.ORG_ID || 1000001,
  PAYMENT_RULE: process.env.PAYMENT_RULE || "M",
  TAXIDTYPE: process.env.TAXIDTYPE || 1000001,
  RECORD_LIMIT: process.env.RECORD_LIMIT || 10,
  COMMENT: process.env.COMMENT || "Venta realizada en unicenta",
  SALESREP_ID: process.env.SALESREP_ID || 1001306,
  C_PAYMENTTERM_ID: process.env.C_PAYMENTTERM_ID || 1000000,
  M_PRICELIST_ID: process.env.M_PRICELIST_ID || 1000032,
  C_CURRENCY_ID: process.env.C_CURRENCY_ID || 1000001,
  C_CONVERSIONTYPE_ID: process.env.C_CONVERSIONTYPE_ID || 1000000,
  M_WAREHOUSE_ID: process.env.M_WAREHOUSE_ID || 1000029,
  CBPGROUP: process.env.CBPGROUP || 1000041,
  TAXIDTYPE: process.env.TAXIDTYPE || 1000001,
  CLIENTID: process.env.CLIENTID || 1000000,
  c_DocTypeTarget_ID: {
    DOC_FISCAL_1: process.env.DOC_FISCAL || "1000170",
    DOC_TICKETS: process.env.DOC_TICKETS || "1000170",
  },
  /*c_POSTenderType_ID = {
    PAGO_MOVIL: process.env.PAGO_MOVIL || "1000005",
    EFECTIVO: process.env.EFECTIVO || "1000006",
  }*/
};

module.exports = idempiereConfig;
