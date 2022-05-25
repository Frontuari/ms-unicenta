const idempiereService = require("./apiService");
const logs = require("../../utils/logs");
const sleep = require("../../utils/sleep");
const paymentService = require("../paymentService");

exports.run = async () => {
  try {
    let posPaymentType = await idempiereService.getPayments();
    console.log(posPaymentType);
    posPaymentType.forEach((data) => {
      let type = paymentService.getTypePaymentByDescription(
        data.a_Name.toUpperCase()
      );

      console.log(type);
      console.log(data.a_Name.toUpperCase());

      paymentService
        .updateTypePosPayment(type, {
          external_id: data.c_POSTenderType_ID,
          type: data.tenderType,
          app: "idempiere",
        })
        .then((result) => {
          // console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    logs.sync("Se actualizaron los tipos de pagos", {
      process: "Actualizar tipo de pago",
    });
  } catch (err) {
    logs.sync("Error al cargar los tipos de pagos", {
      type: "error",
      logs: err.message,
      process: "Actualizar tipo de pago",
    });
  }
};
