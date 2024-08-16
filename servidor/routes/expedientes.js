const { catchAsync } = require("../utils");
const router = require("express").Router();
const {
  verExpedientes,
  verExpediente,
  crearExpediente,
  editarExpediente,
} = require("../controllers/expedientes");

router.get("/", catchAsync(verExpedientes));
router.get("/:id", catchAsync(verExpediente));
router.post("/", catchAsync(crearExpediente));
router.put("/:id", catchAsync(editarExpediente));

module.exports = router;
