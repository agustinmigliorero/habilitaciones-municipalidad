const Expediente = require("../models/Expediente");
const Formulario = require("../models/Formulario");
const Usuario = require("../models/Usuario");
const RespuestaFormulario = require("../models/RespuestaFormulario");

const verExpedientes = async (req, res) => {
  const expedientes = await Expediente.find().populate("usuario");
  res.json(expedientes);
};

const verExpedientesPorUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  const usuario = await Usuario.findById(idUsuario);
  const expedientes = await Expediente.find({ usuario: usuario._id });
  res.json({ expedientes, usuario });
};

const verExpediente = async (req, res) => {
  const { idExpediente } = req.params;
  const expediente = await Expediente.findById(idExpediente)
    .populate({
      path: "formularios",
      populate: [{ path: "idFormulario" }, { path: "respuestas" }],
    })
    .populate("usuario");
  res.json(expediente);
};

const crearExpediente = async (req, res) => {
  const formularios = await Formulario.find();
  const expediente = new Expediente({
    usuario: req.user._id,
  });

  if (formularios.length === 0) {
    return res.json({ mensaje: "No hay formularios registrados" });
  } else {
    for (let i = 0; i < formularios.length; i++) {
      const formulario = formularios[i];
      const respuestas = [];

      for (let j = 0; j < formulario.campos.length; j++) {
        const campo = formulario.campos[j];
        respuestas.push({ etiqueta: campo.etiqueta, valor: "" });
      }
      const nuevaRespuestaFormulario = new RespuestaFormulario({
        idFormulario: formulario._id,
        expediente: expediente._id,
        respuestas: respuestas,
      });

      await nuevaRespuestaFormulario.save();

      expediente.formularios.push(nuevaRespuestaFormulario);
    }
    await expediente.save();
    res.json({ expediente, mensaje: "Expediente creado" });
  }
};

const cambiarEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  const expediente = await Expediente.findByIdAndUpdate(id, {
    estado,
  });
  res.json({ expediente });
};

const eliminarExpediente = async (req, res) => {
  const { id } = req.params;
  const expediente = await Expediente.findByIdAndDelete(id);
  await RespuestaFormulario.deleteMany({ idExpediente: id });

  res.json({ expediente, mensaje: "Expediente eliminado" });
};

module.exports = {
  verExpedientes,
  verExpediente,
  crearExpediente,
  cambiarEstado,
  eliminarExpediente,
  verExpedientesPorUsuario,
};
