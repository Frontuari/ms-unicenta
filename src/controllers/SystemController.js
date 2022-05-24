exports.checkStatusMS = (req, res) => {
  return res.status(200).json({
    ok: true,
    result: "El micro servicio responde a las solicitudess",
  });
};
