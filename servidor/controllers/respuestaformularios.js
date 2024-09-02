const RespuestaFormulario = require("../models/RespuestaFormulario");
const Formulario = require("../models/Formulario");
const Usuario = require("../models/Usuario");
const Expediente = require("../models/Expediente");

const verRespuestaFormulario = async (req, res) => {
  const { id } = req.params;
  const respuestaFormulario = await RespuestaFormulario.findById(id).populate(
    "idFormulario"
  );

  res.json(respuestaFormulario);
};

const editarRespuestaFormulario = async (req, res) => {
  const { id } = req.params;
  const { respuestas } = req.body;
  const respuestaFormulario = await RespuestaFormulario.findByIdAndUpdate(id, {
    respuestas,
  });
  res.json(respuestaFormulario);
};

module.exports = {
  verRespuestaFormulario,
  editarRespuestaFormulario,
};
