const idempiereService = require("../../services/apiService");
const logs = require("../utils/logs");
const taxesService = require("../services/taxesService");
exports.uncheckAllOrdersExistError = async (req, res) => {
  try {
    const response = await OrderService.uncheckAllOrdersExistError();

    return res.status(200).json({ ok: true, result: response });
  } catch (error) {
    return res.status(404).json({ ok: false, error: error.message });
  }
  ``;
};
