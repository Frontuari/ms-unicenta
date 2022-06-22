const idempiereEnv = require("../../config/idempiereEnv");
const logs = require("../../utils/logs");
const OrderService = require("../OrderService");
const date = require("../../utils/date");
const idempiereService = require("./apiService");
const taskService = require("../../services/taskService");

exports.run = async () => {
  const process = "sincronizar devoluciones  de ventas";
  try {
    logs.sync("# Inicio de Sincronizacion en 5sg ", { deative_db: true });

    await taskService.activeProcess(2);

    const tickets = await OrderService.getNewReturnsOrders();

    const countTicekts = tickets.length;

    if (countTicekts < 1) {
      logs.sync("No existen ordenes de devolucion por sincronizar ", {
        type: "warn",
      });
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

        if (
          response.errorMsg.toUpperCase() == "OK" ||
          response.errorMsg.toUpperCase() == "CO"
        ) {
          ticket.IsImported = "Y";

          ticket
            .save()
            .then(() => {})
            .catch(() => {
              console.log("error al guardar");
            });

          logs.sync(response, {
            process,
            deactive_messages: true,
            ticket_id: ticket.id,
          });

          logs.sync(
            ` ticket de devolucion ${ticket.ticketid} sincronizado ...`,
            {
              process,
              type: "success",
              ticket_id: ticket.id,
            }
          );
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
            `Respuesta de Error desde idempiere, ticket de devolucion: ${ticket.ticketid}`,
            {
              type: "error",
              process,
              ticket_id: ticket.id,
            }
          );
        }
      } catch (error) {
        ticket.exist_error = "Y";

        ticket
          .save()
          .then(() => {})
          .catch(() => {
            console.log("### ERROR ###");
          });

        logs.sync(error.message, {
          type: "error",
          process: "sincronizar devoluciones  de ventas",
          logs: error,
        });

        logs.sync("Error al sincronizar devolucion....", {
          type: "error",
          process: "sincronizar devoluciones  de ventas",
          logs: error,
        });
      }
    }

    try {
      await taskService.deactiveProcess(2);
    } catch (ee) {
      logs.sync(ee.message, {
        type: "error",
        process: "Liberar Job",
        logs: error,
      });
    }

    return true;
  } catch (error) {
    try {
      ticket.set({
        exist_error: "Y",
      });

      await ticket.save();
    } catch (e) {}

    logs.sync("Error al sincronizar las devoluciones de ventas", {
      type: "error",
      process: "sincronizar devoluciones de ventas",
      logs: error,
    });

    logs.sync(error.message, {
      type: "error",
      process: "sincronizar devoluciones de ventas",
      logs: error,
    });

    try {
      await taskService.deactiveProcess(2);
    } catch (ee) {
      logs.sync(ee.message, {
        type: "error",
        process: "Liberar Job",
        logs: error,
      });
    }
  }
};

const createOrderJSON = (ticket, ticketlines, ticketOriginal) => {
  return {
    orgId: idempiereEnv.ORG_ID,
    documentNo: ticket.ticketid, // ticket de devolucion
    orderdocumentno: ticket.status, // ticket a devolver
    description: idempiereEnv.COMMENT_RETURN,
    dateTrx: date(ticket.receipts.datenew),
    salesRep_ID: ticket.person,
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
