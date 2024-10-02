const Formulario = require("./models/Formulario");
const fs = require("fs");
const Usuario = require("./models/Usuario");
const Expediente = require("./models/Expediente");
const RespuestaFormulario = require("./models/RespuestaFormulario");

async function generarFormularios() {
  //leer los formularios de la carpeta json-formularios y crearlos en la base de datos usando el modelo Formulario
  //verificar antes si ya estan creados, en ese caso no crearlos
  //verificar uno por uno, porque puede ser que se vayan agregando nuevos formularios

  const formulariosCargados = await Formulario.find();

  fs.readdirSync("../json-formularios").forEach((file) => {
    const formulario = JSON.parse(
      fs.readFileSync(`../json-formularios/${file}`, "utf-8")
    );

    //verificar si el formulario ya existe
    const formularioExistente = formulariosCargados.find((form) => {
      return form.nombreFormulario === formulario.nombreFormulario;
    });

    if (!formularioExistente) {
      console.log(formulario.nombreFormulario, "FORMULARIO CREADO");
      const nuevoFormulario = new Formulario(formulario);
      nuevoFormulario.save();
    }
  });
}

function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
}

const borrarExpedientes = async (req, res) => {
  const usuarios = await Usuario.find();
  await Expediente.deleteMany({});
  await RespuestaFormulario.deleteMany({});

  for (let i = 0; i < usuarios.length; i++) {
    const usuario = usuarios[i];
    usuario.expedientes = [];
    await usuario.save();
  }

  console.log("Expedientes borrados");
  res.json({ message: "Expedientes borrados" });
};

module.exports = { catchAsync, generarFormularios, borrarExpedientes };
