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
const crypto = require("crypto");

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
          /*apppasword:
            "sha1:" +
            crypto.createHash("sha1").update(data.password).digest("hex"),*/
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
        logs.sync("Error al cargar registro de almacenes", {
          type: "error",
          logs: e.message,
          process,
        });
      }
    });

    return {
      message: "Se actualizo el registro de almacenes",
      data: locations,
    };
  } catch (err) {
    logs.sync("Error al cargar los registros de almacenes", {
      type: "error",
      logs: err.message,
      process,
    });

    return {
      message: "Error al cargar los registros de almacenes",
      error: true,
      logs: err.message,
    };
  }
};

exports.runProductGroups = async () => {
  try {
    const productgroups = await idempiereService.getAllProductGroups();
    const process = "Actualizar Grupo de Productos";

    logs.sync(`Total de Productos ${productgroups.length} `, {
      process,
    });

    productgroups.forEach(async (item) => {
      await categorieService.upsertCategories(item.groupId, item.groupName);
    });

    return {
      message: "Se inserto/actualizo el registro de categorias de productos",
      data: productgroups,
    };
  } catch (err) {
    logs.sync(
      "Error al cargar/actualizar los registros de los grupos de producto",
      {
        type: "error",
        logs: err.message,
        process,
      }
    );

    return {
      message:
        "Error al cargar/actualizar los registros de los grupos de producto",
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
    const process = "Actualizar Productos";
    let countProducts = 0;

    if (products) {
      try {
        await currencyratesService.upsertRate(
          products[0].currencyRate,
          products[0].validTo
        );

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
          reference: data.productValue,
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
          memodate: data.syncDate,
        };
        let result = false;
        let cat = false;

        if (data.orgId == "-1") {
          result = await productsService.create(dataJson);
          logs.sync("Se creo el producto", {
            process,
            logs: dataJson,
            type: "success",
          });

          data.orgId = idempiereEnv.ORG_ID;

          /**await categorieService.upsertProductsCategories(data.productId);**/
          countProducts++;
        } else {
          if (data.updateProduct) {
            result = await productsService.update(dataJson);
            /**await categorieService.upsertProductsCategories(data.productId);**/
            logs.sync("Se actualizo el producto", {
              type: "success",
              process,
              logs: dataJson,
            });

            countProducts++;
          }
        }

        /***  Create Log ***/
        if (result) {
          try {
            await idempiereService.insertLogProduct(data);
            logs.sync("Se cargo el log de productos en idempiere", {
              type: "success",
              process,
            });
          } catch (eee) {
            logs.sync(
              "Error al cargar el log de productos en idempiere: " + eee,
              {
                type: "error",
                logs: eee.message,
                process,
              }
            );
          }
        }
        /***  End Create Log ***/
      } catch (e) {
        console.log(e);
        logs.sync(
          "Error al cargar registro de productos: [" +
            data.productValue +
            "] " +
            e.message,
          {
            type: "error",
            logs: e.message,
            process,
          }
        );
      }
    });

    return {
      message: "Se actualizo el registro de productos",
      data: products,
    };
  } catch (err) {
    logs.sync("Error al cargar/actualizar los registros de productos/tasas", {
      type: "error",
      logs: err.message,
      process,
    });

    return {
      message: "Error al cargar/actualizar los registros de productos/tasas",
      error: true,
      logs: err.message,
    };
  }
};

exports.runProductCats = async () => {
  try {
    let result = false;
    result = await categorieService.recordProductCat();
    if (!result) {
      logs.sync(
        "Error al insertar los registros de productos de acceso rapido",
        {
          type: "error",
          logs: err.message,
          process,
        }
      );

      return {
        message:
          "Error al insertar los registros de productos de acceso rapido",
        error: true,
        logs: err.message,
      };
    }
    return {
      message: "Se insertaron los registros de productos de acceso rapido",
      data: "Registros insertados",
    };
  } catch (e) {
    logs.sync("Error al insertar los registros de productos de acceso rapido", {
      type: "error",
      logs: err.message,
      process,
    });

    return {
      message: "Error al insertar los registros de productos de acceso rapido",
      error: true,
      logs: err.message,
    };
  }
};
