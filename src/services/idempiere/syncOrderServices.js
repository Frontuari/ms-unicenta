const axios = require("axios");
const idempiereEnv = require("../../config/idempiereEnv");
const logs = require("../../utils/logs");
const { execSync } = require("child_process");
const OrderService = require("../../services/OrderService");
const PaymentService = require("../../services/paymentServices");
const date = require("../../utils/date");

exports.run = async () => {
  try {
    logs.sync("# Inicio de Sincronizacion en 5sg ", { deative_db: true });

    const url = `${idempiereEnv.API_URL}/orders`;
    const options = {
      headers: { "content-type": "application/json" },
    };

    const tickets = await OrderService.getNewOrders();

    const countTicekts = tickets.length;

    if (countTicekts < 1) {
      console.log("\n");
      console.log("\n");

      logs.sync("No existen ordenes por sincronizar ");

      console.log("\n");
      console.log("\n");
    } else {
      logs.sync(`Tickets por Sincronizar: ${countTicekts} `);
    }

    for (let ticket of tickets) {
      logs.sync(`ticket a sincronizar : ${ticket.ticketid}`, {
        //       ticket: ticket.id,
      });

      try {
        let ticketlines = await OrderService.getNewOrderLines(ticket.id);

        let paymentServices = await PaymentService.getPaymentsForTicket(
          ticket.id
        );

        let dataJSON = createOrderJSON(ticket, ticketlines, paymentServices);

        const response = await axios.post(url, dataJSON, options);
        if (response.data.errMsg.toUpperCase() == "OK") {
          ticket.IsImported = "Y";

          ticket
            .save()
            .then(() => {})
            .catch(() => {
              console.log("error al guardar");
            });
          console.log("\n");
          console.log("\n");
          console.log(` ticket ${ticket.ticketid} sincronizado ...`);
          logs.sync(response.data, {
            process: "venta sincronizada",
            deactive_messages: true,
            ticket_id: ticket.id,
          });
          console.log("\n");
          console.log("\n");
        } else {
          ticket.exist_error = "Y";

          ticket
            .save()
            .then(() => {})
            .catch(() => {
              console.log("### ERROR ###");
            });

          console.log("\n");
          console.log("\n");

          logs.sync(response.data.errMsg, {
            type: "error",
            process: "sincronizar ventas",
            ticket_id: ticket.id,
            //logs: response.data,
          });

          console.log(
            `Respuesta de Error desde idempiere.... ticket: ${ticket.ticketid}`
          );

          console.log("\n");
          console.log("\n");
        }
      } catch (error) {
        console.log(error);

        ticket.exist_error = "Y";

        ticket
          .save()
          .then(() => {})
          .catch(() => {
            console.log("### ERROR ###");
          });

        console.log("Error al sincronizar....");

        console.log("\n");

        logs.sync(error.message, {
          type: "error",
          process: "sincronizar ventas",
          // logs: error,
        });
        console.log("\n");
        console.log("\n");
      }
    }

    return true;
  } catch (error) {
    console.log(error);
    //execSync("sleep 5");

    logs.sync(error.message, {
      type: "error",
      process: "sincronizar ventas",
      // logs: error,
    });

    ticket.set({
      exist_error: "Y",
    });

    await ticket.save();

    //throw new Error(error.message);
  }
};

const definePayment = (receipt, payments) => {
  let lines = [];

  payments.forEach((payment) => {
    try {
      lines.push({
        aD_Org_ID: idempiereEnv.ORG_ID,
        c_POSTenderType_ID: payment.pos_payments.external_id,
        payAmt: payment.total, // AQUI POSIBLEMENTE CAMBIAR . por ,
        tenderType: "A",
        depositGroup: "Pago Realizado en Unicenta",
        help: payment.pos_payments.name,
        accountNo: null,
        a_Name: null,
        creditCardNumber: null,
        creditCardType: null,
        datePromised: date(receipt.datenew),
        micr: "test",
        swiftCode: "39393939",
        routingNo: "39393993",
        voiceAuthCode: "0393",
      });
    } catch (error) {
      console.log(error);
    }
  });

  return lines;
};

const defineTicketLines = (ticketlines) => {
  let lines = [];

  ticketlines.forEach((line) => {
    let product = line.products;
    lines.push({
      clientId: idempiereEnv.CLIENTID,
      orgId: idempiereEnv.ORG_ID,
      description: product.name,
      m_product_id: product.id,
      qtyOrdered: line.units,
      priceActual: line.price,
      priceEntered: line.price,
      c_uom_id: product.uom,
      c_tax_id: line.taxid,
      qtyEntered: line.units,
      priceList: line.price,
      discount: 0,
    });
  });

  return lines;
};

const definePartnerLocation = (ticket) => {
  const customer = ticket.customers;
  return [
    {
      c_Location_ID: 0,
      name: customer.city,
      phone: customer.phone || "0",
      isBillTo: true,
      isPayFrom: true,
      isRemitTo: true,
      isShipTo: true,
    },
  ];
};

const createOrderJSON = (ticket, ticketlines, payments) => {
  return {
    orgId: idempiereEnv.ORG_ID,
    documentNo: ticket.ticketid,
    description: idempiereEnv.COMMENT,
    c_DocTypeTarget_ID: 1000170,
    C_DocTypeOrder_ID: 1000170,
    dateOrdered: date(ticket.receipts.datenew),
    dateAcct: date(ticket.receipts.datenew),
    salesRep_ID: idempiereEnv.SALESREP_ID,
    c_PaymentTerm_ID: idempiereEnv.C_PAYMENTTERM_ID,
    m_PriceList_ID: idempiereEnv.M_PRICELIST_ID,
    c_Currency_ID: idempiereEnv.C_CURRENCY_ID,
    c_ConversionType_ID: idempiereEnv.C_CONVERSIONTYPE_ID,
    m_Warehouse_ID: idempiereEnv.M_WAREHOUSE_ID,
    paymentRule: idempiereEnv.PAYMENT_RULE,
    ftu_FiscalDocumentNo: ticket.fiscalprinterno,
    ftu_FiscalPrinterSerial: ticket.serialprinter,
    isTransferred: true,
    completeIt: true,
    partnerinfo: definePartners(ticket),
    partnerlocation: definePartnerLocation(ticket),
    lines: defineTicketLines(ticketlines),
    ppayment: definePayment(ticket.receipts, payments),
  };
};

const definePartners = (ticket) => {
  const customer = ticket.customers;
  return [
    {
      value: customer.searchkey,
      name: customer.name,
      taxID: customer.searchkey,
      isCustomer: true,
      cbpgroup: idempiereEnv.CBPGROUP,
      taxidtype: idempiereEnv.TAXIDTYPE,
    },
  ];
};
