const syncMaster = require("../services/idempiere/syncMastersService");

exports.syncTaxes = async (req, res) => {
  try {
    const response = await syncMaster.runTaxes();

    return res.status(200).json({ ok: true, result: response });
  } catch (error) {
    return res.status(404).json({ ok: false, error: error.message });
  }
};

exports.syncTypePayments = async (req, res) => {
  try {
    const response = await syncMaster.runPayments();

    return res.status(200).json({ ok: true, result: response });
  } catch (error) {
    return res.status(404).json({ ok: false, error: error.message });
  }
};

exports.syncUoms = async (req, res) => {
  try {
    const response = await syncMaster.runUoms();

    return res.status(200).json({ ok: true, result: response });
  } catch (error) {
    return res.status(404).json({ ok: false, error: error.message });
  }
};

exports.syncPeople = async (req, res) => {
  try {
    const response = await syncMaster.runPeople();

    return res.status(200).json({ ok: true, result: response });
  } catch (error) {
    return res.status(404).json({ ok: false, error: error.message });
  }
};

exports.syncLocations = async (req, res) => {
  try {
    const response = await syncMaster.runLocations();

    return res.status(200).json({ ok: true, result: response });
  } catch (error) {
    return res.status(404).json({ ok: false, error: error.message });
  }
};

exports.syncProducts = async (req, res) => {

    syncMaster.runProductGroups().then(rsp => {
      try {
      const response = await syncMaster.runProducts();
      return res.status(200).json({ ok: true, result: response });
      } catch (error) {
        log.sync(error.message , { type: 'error' } )
      }
    }).catch(error => {
      return res.status(404).json({ ok: false, error: error.message });
    })
    

};
