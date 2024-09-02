const express = require("express");
const router = express.Router();
const {
  verRespuestaFormulario,
  editarRespuestaFormulario,
} = require("../controllers/respuestaformularios");
const { catchAsync } = require("../utils");

router.get("/:id", catchAsync(verRespuestaFormulario));
router.put("/:id", catchAsync(editarRespuestaFormulario));

module.exports = router;
