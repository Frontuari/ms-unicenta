const idempiereService = require("./apiService");
const logs = require("../../utils/logs");
const taxesService = require("../taxesService");

exports.run = async () => {
  try {
    let taxes = await idempiereService.getAllTaxes();

    taxes.forEach(async (data) => {
      try {
        await taxesService.upsertCategoriep(
          data.taxCategoryId,
          data.taxCategoryName
        );
        await taxesService.upsertTaxes({
          id: data.id,
          name: data.name,
          category: data.taxCategoryId,
          rate: Double.parse(data.rate) / 100,
        });
      } catch (e) {
        logs.sync("Error al cargar el impuesto", {
          type: "error",
          logs: e.message,
          process: "Actualizar impuestos",
        });
      }
    });

    logs.sync("Se actualizaron los maestros de impuestos", {
      process: "Actualizar impuestos",
    });
  } catch (err) {
    logs.sync("Error al cargar los impuestos", {
      type: "error",
      logs: err.message,
      process: "Actualizar impuestos",
    });
  }
};
