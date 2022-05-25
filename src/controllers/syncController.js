const syncTaxesService = require("../services/idempiere/syncTaxesService");
const globalConfig = require("../config/global");
exports.syncTaxes = async (req, res) => {
  try {
    const response = await syncTaxesService.run();

    return res.status(200).json({ ok: true, result: response });
  } catch (error) {
    return res.status(404).json({ ok: false, error: error.message });
  }
};
