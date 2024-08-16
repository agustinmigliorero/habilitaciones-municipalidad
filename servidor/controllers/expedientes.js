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
  //   const usuario = await Usuario.findById(req.user._id);
  const usuario = await Usuario.findById("66bdbd6dd4625296d2fb4c88");
  const nuevoExpediente = new Expediente({
    formularios: formularios.push(formularios),
    usuario: usuario._id,
  });
  await nuevoExpediente.save();
  usuario.expedientes.push(nuevoExpediente._id);
  await usuario.save();
  res.json({ nuevoExpediente });
};

// const editarExpediente = async (req, res) => {
//   const { id } = req.params;
//   let expediente;
//   if (
//     (req.user && req.user.rol === "administrador") ||
//     req.user.rol === "habilitaciones"
//   ) {
//     const { formularios, estado } = req.body;
//     expediente = await Expediente.findByIdAndUpdate(id, {
//       formularios,
//       estado,
//     });
//   } else {
//     const { formularios } = req.body;
//     expediente = await Expediente.findByIdAndUpdate(id, {
//       formularios,
//     });
//   }
//   res.json({ expediente });
// };

const agregarFormulario = async (req, res) => {
  const { id } = req.params;
  const { formulario } = req.body;

  const expediente = await Expediente.findByIdAndUpdate(id, {
    $push: { formularios: formulario },
  });
  res.json({ expediente });
};

module.exports = {
  verExpedientes,
  verExpediente,
  crearExpediente,
  //   editarExpediente,
};
