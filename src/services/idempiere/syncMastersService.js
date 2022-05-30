const idempiereService = require("./apiService");
const logs = require("../../utils/logs");
const date = require("../../utils/date");
const paymentService = require("../paymentService");
const taxesService = require("../taxesService");
const uomService = require("../uomService");
const peopleService = require("../peopleService");
const locationsService = require("../locationsService");
const productsService = require("../productsService");
const idempiereEnv = require("../../config/idempiereEnv");
const categorieService = require("../categoriesService");
const currencyratesService = require("../currencyratesService");

exports.runPayments = async () => {
  try {
    let posPaymentType = await idempiereService.getPayments();

    posPaymentType.forEach((data) => {
      let type = paymentService.getTypePaymentByDescription(
        data.a_Name.toUpperCase()
      );

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
      type: "success",
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
      type: "success",
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
          type: "success",
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
    const peoples = await idempiereService.getEmployeesByOrg(
      idempiereEnv.ORG_ID
    );
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
          type: "success",
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

exports.runLocations = async () => {
  try {
    const locations = await idempiereService.getWarehousesByOrg(
      idempiereEnv.ORG_ID
    );
    const process = "Actualizar Almacenes";
    locations.forEach(async (data) => {
      try {
        await locationsService.upsert({
          id: data.id,
          name: data.name,
          address: data.address,
        });

        logs.sync("Se actualizo el almacen", {
          process,
          type: "success",
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
      data: locations,
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

exports.runProducts = async () => {
  try {
    const products = await idempiereService.getProductByOrg(
      idempiereEnv.ORG_ID
    );
    const process = "Actualizar Almacenes";
    let countProducts = 0;

    if (products) {
      try {
        console.log(products[0].validTo);
        console.log(new Date(products[0].validTo));
        console.log(date(new Date(products[0].validTo)));
        await currencyratesService.create({
          indicatorname: "Tasa Idempiere",
          currency_id: 1000001,
          currencyto_id: 100,
          rate: products[0].currencyRate,
          validto: new Date(products[0].validTo),
        });

        logs.sync("Se cargo la tasa", {
          type: "success",
          process,
        });

        logs.sync(`Total de Productos ${products.length} `, {
          process,
        });
      } catch (err) {
        logs.sync(err, {
          type: "error",
          process,
        });
        logs.sync("Error al cargar la tasa", {
          type: "error",
          process,
        });
      }
    }

    products.forEach(async (data) => {
      try {
        let dataJson = {
          id: data.productId,
          reference: data.productId,
          code: data.upc,
          codetype: data.codeType,
          name: data.productName,
          pricebuy: data.priceBuy,
          pricesell: data.priceSell,
          category: data.groupId,
          taxcat: data.taxCategoryId,
          uom: data.uoMId,
          isscale: data.bulk ? 1 : 0,
          plucode: data.plu,
          priceusdsale: data.priceUSDSale,
          stockunits: data.stockUnits,
        };
        let result = false;
        let cat = false;

        cat = await categorieService.upsertCategories(
          data.groupId,
          data.groupName
        );

        if (cat) {
          if (data.orgId == "-1") {
            result = await productsService.create(dataJson);
            logs.sync("Se creo el producto", {
              process,
              logs: dataJson,
              type: "success",
            });

            data.orgId = idempiereEnv.ORG_ID;
            await categorieService.upsertProductsCategories(data.productId);
            countProducts++;
          } else {
            if (data.updateProduct) {
              result = await productsService.update(dataJson);
              await categorieService.upsertProductsCategories(data.productId);
              logs.sync("Se actualizo el producto", {
                type: "success",
                process,
                logs: dataJson,
              });
              countProducts++;
            }
          }
        }

        if (result) {
          try {
            await idempiereService.insertLogProduct(data);

            logs.sync(data, {
              type: "success",
              process,
            });

            logs.sync("Se cargo el log de registro en idempiere", {
              type: "success",
              process,
            });
          } catch (eee) {
            logs.sync(eee, {
              type: "error",
              logs: eee.message,
              process,
            });
            logs.sync("Error al cargar el log de registro en idempiere", {
              type: "error",
              logs: eee.message,
              process,
            });
          }
        }
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
      data: products,
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
