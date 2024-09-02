const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const respuestaCampoSchema = new Schema({
  etiqueta: { type: String, required: true },
  valor: Schema.Types.Mixed, // Puede ser cualquier tipo de dato
});

// Esquema para las respuestas del formulario
const respuestaFormularioSchema = new Schema({
  idFormulario: {
    type: Schema.Types.ObjectId,
    ref: "Formulario",
    required: true,
  },
  respuestas: [respuestaCampoSchema],
  expediente: { type: Schema.Types.ObjectId, ref: "Expediente" },
  estado: {
    type: String,
    default: "pendiente",
    enum: ["pendiente", "aprobado", "rechazado"],
  },
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model(
  "RespuestaFormulario",
  respuestaFormularioSchema
);
