const { catchAsync } = require("../utils");
const router = require("express").Router();
const {
  verExpedientes,
  verExpediente,
  crearExpediente,
  verFormulario,
  agregarFormulario,
  cambiarEstado,
  editarFormulario,
} = require("../controllers/expedientes");

router.get("/", catchAsync(verExpedientes));
router.get("/:idExpediente", catchAsync(verExpediente));
router.post("/", catchAsync(crearExpediente));
router.put("/:idExpediente", catchAsync(cambiarEstado));
router.get("/:idExpediente/:idFormulario", catchAsync(verFormulario));
router.post("/:idExpediente/:idFormulario", catchAsync(agregarFormulario));
router.put("/:idExpediente/:idFormulario", catchAsync(editarFormulario));

module.exports = router;
