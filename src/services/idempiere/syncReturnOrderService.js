const idempiereEnv = require("../../config/idempiereEnv");
const logs = require("../../utils/logs");
const OrderService = require("../OrderService");
const date = require("../../utils/date");
const idempiereService = require("./apiService");

exports.run = async () => {
  const process = "sincronizar devoluciones  de ventas";
  try {
    logs.sync("# Inicio de Sincronizacion en 5sg ", { deative_db: true });

    const tickets = await OrderService.getNewReturnsOrders();

    const countTicekts = tickets.length;

    if (countTicekts < 1) {
      logs.sync("No existen ordenes por sincronizar ", { type: "warn" });
    } else {
      logs.sync(`Tickets devolucion por Sincronizar: ${countTicekts} `);
    }

    for (let ticket of tickets) {
      logs.sync(`ticket de devolucion a sincronizar : ${ticket.ticketid}`, {
        ticket_id: ticket.id,
      });

      try {
        let ticketlines = await OrderService.getNewOrderLines(ticket.id);
        let ticketOriginal = await OrderService.getTicket(ticket.status);

        let dataJSON = createOrderJSON(ticket, ticketlines, ticketOriginal);

        const response = await idempiereService.getReturnOrder(dataJSON);
        console.log("AQUI ENTRO");
        console.log(response);

        if (response.errorMsg.toUpperCase() == "OK") {
          ticket.IsImported = "Y";

          ticket
            .save()
            .then(() => {})
            .catch(() => {
              console.log("error al guardar");
            });

          console.log(
            ` ticket de devolucion ${ticket.ticketid} sincronizado ...`
          );
          logs.sync(response, {
            process,
            deactive_messages: true,
            ticket_id: ticket.id,
          });
        } else {
          ticket.exist_error = "Y";

          ticket
            .save()
            .then(() => {})
            .catch(() => {
              console.log("### ERROR ###");
            });

          logs.sync(response.errorMsg, {
            type: "error",
            process,
            ticket_id: ticket.id,
            logs: response,
          });

          logs.sync(
            `Respuesta de Error desde idempiere.... ticket: ${ticket.ticketid}`,
            {
              type: "error",
              process,
              ticket_id: ticket.id,
            }
          );
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

        console.log("Error al sincronizar devolucion....");

        logs.sync(error.message, {
          type: "error",
          process: "sincronizar devoluciones  de ventas",
          logs: error,
        });
      }
    }

    return true;
  } catch (error) {
    console.log(error);
    //execSync("sleep 5");

    logs.sync(error.message, {
      type: "error",
      process: "sincronizar devoluciones de ventas",
      logs: error,
    });

    ticket.set({
      exist_error: "Y",
    });

    await ticket.save();

    //throw new Error(error.message);
  }
};

const createOrderJSON = (ticket, ticketlines, ticketOriginal) => {
  return {
    orgId: idempiereEnv.ORG_ID,
    documentNo: ticket.ticketid, // ticket de devolucion
    orderdocumentno: ticket.status, // ticket a devolver
    description: idempiereEnv.COMMENT_RETURN,
    dateTrx: date(ticket.receipts.datenew),
    salesRep_ID: idempiereEnv.SALESREP_ID,
    name: ticket.ticketid,

    c_bpartner_id: `${ticket.customers.taxid}`,

    ftu_FiscalDocumentNo: ticketOriginal.fiscalprinterno,
    ftu_FiscalPrinterSerial: ticketOriginal.serialprinter,

    rmalines: defineRMALines(ticketlines),
  };
};

const defineRMALines = (ticketlines) => {
  let lines = [];

  ticketlines.forEach((line) => {
    let product = line.products;
    lines.push({
      clientId: idempiereEnv.CLIENTID,
      orgId: idempiereEnv.ORG_ID,
      description: product.name,
      m_product_id: product.id,
      qty: line.units * -1,
      c_tax_id: line.taxid,
      amt: line.price,
    });
  });

  return lines;
};
