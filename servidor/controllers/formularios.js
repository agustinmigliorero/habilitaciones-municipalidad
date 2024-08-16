const Formulario = require("../models/Formulario");
const Expediente = require("../models/Expediente");

const verFormulario = async (req, res) => {
  const { id } = req.params;
  const formularioConExpediente = await Formulario.findById(id).populate(
    "expediente"
  );
  const formulario = await Formulario.findById(id);
  res.json({ formulario, formularioConExpediente });
};

const crearFormulario = async (req, res) => {
  const { campos, nombre } = req.body;
  const nuevoFormulario = new Formulario({
    campos,
    nombre,
  });
  await nuevoFormulario.save();
  res.json({ nuevoFormulario });
};

const editarFormulario = async (req, res) => {
  const { id } = req.params;
  const { campos } = req.body;
  const formulario = await Formulario.findByIdAndUpdate(id, {
    campos,
  });
  res.json({ formulario });
};

module.exports = { verFormulario, crearFormulario, editarFormulario };
