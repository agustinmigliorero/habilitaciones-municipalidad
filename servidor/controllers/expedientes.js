const Expediente = require("../models/Expediente");
const Formulario = require("../models/Formulario");
const Usuario = require("../models/Usuario");

const verExpedientes = async (req, res) => {
  const expedientes = await Expediente.find();
  res.json(expedientes);
};

const verExpediente = async (req, res) => {
  const { id } = req.params;
  const expediente = await Expediente.findById(id).populate("formularios");
  res.json({ expediente });
};

const crearExpediente = async (req, res) => {
  const { formularios } = req.body;
  const usuario = await Usuario.findById(req.user._id);
  // const usuario = await Usuario.findById("66bdbd6dd4625296d2fb4c88");
  const nuevaRespuestaFormulario = new RespuestaFormulario({
    formularios: formularios,
  });
  const nuevoExpediente = new Expediente({
    formularios: formularios.push(formularios),
    usuario: usuario._id,
  });
  await nuevoExpediente.save();
  usuario.expedientes.push(nuevoExpediente._id);
  await usuario.save();
  res.json({ nuevoExpediente });
};

const agregarFormulario = async (req, res) => {
  const { idExpediente } = req.params;
  const { formulario } = req.body;

  const expediente = await Expediente.findByIdAndUpdate(idExpediente, {
    $push: { formularios: formulario },
  });
  res.json({ expediente, mensaje: "Formulario agregado" });
};

const verFormulario = async (req, res) => {
  const { idExpediente, idFormulario } = req.params;
  const formulario = await Formulario.findById(idFormulario);
  const expediente = await Expediente.findById(idExpediente).populate(
    "formularios"
  );

  const respuestasFormulario = expediente.formularios.filter(
    (form) => form.idFormulario === idFormulario
  );

  if (respuestasFormulario.length === 0) {
    res.json({
      expediente,
      mensaje: "Este formulario no esta registrado",
      formulario,
    });
  }

  res.json({ formulario, expediente, respuestasFormulario });
};

const editarFormulario = async (req, res) => {
  const { idExpediente, idFormulario } = req.params;
  const { formulario } = req.body;
  const expediente = await Expediente.findById(idExpediente).populate(
    "formularios"
  );
  const formularioAEditar = expediente.formularios.filter(
    (form) => form.idFormulario === idFormulario
  );

  if (formularioAEditar.length === 0) {
    res.json({
      expediente,
      mensaje: "Este formulario no esta registrado",
      formulario,
    });
  }

  formularioAEditar[0].campos = formulario;
  await expediente.save();
  res.json({ expediente, formularioAEditar });
};

const cambiarEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const expediente = await Expediente.findByIdAndUpdate(id, {
    estado,
  });
  res.json({ expediente });
};

module.exports = {
  verExpedientes,
  verExpediente,
  crearExpediente,

  agregarFormulario,
  cambiarEstado,
  verFormulario,
  editarFormulario,
};
