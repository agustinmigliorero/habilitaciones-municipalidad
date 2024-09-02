const { catchAsync } = require("../utils");
const router = require("express").Router();
const {
  verExpedientes,
  verExpediente,
  crearExpediente,
  cambiarEstado,
  eliminarExpediente,
  verExpedientesPorUsuario,
} = require("../controllers/expedientes");

router.get("/", catchAsync(verExpedientes));
router.get("/usuario/:idUsuario", catchAsync(verExpedientesPorUsuario));
router.get("/:idExpediente", catchAsync(verExpediente));
router.post("/", catchAsync(crearExpediente));
router.put("/:idExpediente", catchAsync(cambiarEstado));
router.delete("/:idExpediente", catchAsync(eliminarExpediente));

module.exports = router;
