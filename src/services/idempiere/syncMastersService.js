const idempiereService = require("./apiService");
const logs = require("../../utils/logs");
const paymentService = require("../paymentService");
const taxesService = require("../taxesService");
const uomService = require("../uomService");
const peopleService = require("../peopleService");
const idempiereEnv = require("../../config/idempiereEnv");

exports.runPayments = async () => {
  try {
    let posPaymentType = await idempiereService.getPayments();

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

exports.runTaxes = async () => {
  try {
    let taxes = await idempiereService.getAllTaxes();

    taxes.forEach(async (data) => {
      try {
        await taxesService.upsertCategories(
          data.taxCategoryId,
          data.taxCategoryName
        );
        await taxesService.upsertTaxes({
          id: data.id,
          name: data.name,
          category: data.taxCategoryId,
          rate: parseFloat(data.rate) / 100,
        });
      } catch (e) {
        logs.sync("Error al cargar el impuesto", {
          type: "error",
          logs: e.message,
          process: "Actualizar impuestos",
        });

        console.log(e);
      }
    });

    logs.sync("Se actualizaron los maestros de impuestos", {
      process: "Actualizar impuestos",
    });
    return {
      message: "Se actualizaron los maestros de impuestos",
      data: taxes,
    };
  } catch (err) {
    logs.sync("Error al cargar los impuestos", {
      type: "error",
      logs: err.message,
      process: "Actualizar impuestos",
    });

    return {
      message: "Error al cargar los impuestos",
    };
  }
};

exports.runUoms = async () => {
  try {
    let Uoms = await idempiereService.getAllUoms();

    Uoms.forEach(async (data) => {
      try {
        await uomService.upsertUOM(data.id, data.name);
        logs.sync("Se actualizo la unidad de medida", {
          process: "Actualizar unidades de medida",
        });
      } catch (e) {
        logs.sync("Error al cargar la unidad de medida", {
          type: "error",
          logs: e.message,
          process: "Actualizar unidades de medida",
        });
      }
    });

    return {
      message: "Se actualizo la unidad de medida",
      data: Uoms,
    };
  } catch (err) {
    logs.sync("Error al cargar las unidades de medida", {
      type: "error",
      logs: err.message,
      process: "Actualizar unidades de medida",
    });

    return {
      message: "Error al cargar las unidades de medidas",
      error: true,
      logs: err.message,
    };
  }
};

exports.runPeople = async () => {
  try {
    const peoples = await idempiereService.getEmployeesByOrg(idempiereEnv.org);
    const process = "Actualizar Usuario";
    peoples.forEach(async (data) => {
      try {
        await peopleService.upsertPeople({
          id: data.id,
          name: data.name,
          role: data.role,
          visible: data.active == true ? 1 : 0,
        });

        logs.sync("Se actualizo el usuario", {
          process,
        });
      } catch (e) {
        console.log(e);
        logs.sync("Error al cargar registro", {
          type: "error",
          logs: e.message,
          process,
        });
      }
    });

    return {
      message: "Se actualizo el registro",
      data: peoples,
    };
  } catch (err) {
    logs.sync("Error al cargar los registros", {
      type: "error",
      logs: err.message,
      process,
    });

    return {
      message: "Error al cargar los registros",
      error: true,
      logs: err.message,
    };
  }
};
