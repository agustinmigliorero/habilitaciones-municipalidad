const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const campoSchema = new Schema({
  tipo: { type: String, required: true }, // input_text, checkbox, select, etc.
  etiqueta: { type: String, required: true },
  requerido: { type: Boolean, default: false },
  opciones: [String], // Solo para campos tipo select o radio
  valor: Schema.Types.Mixed, // Puede ser cualquier tipo de dato
});

const formularioSchema = new Schema({
  nombre: { type: String, required: true },
  campos: [campoSchema],
  expediente: { type: Schema.Types.ObjectId, ref: "Expediente" },
  estado: { type: String, default: "pendiente" }, //Estados: "pendiente", "aprobado", "rechazado", "revision"
});

module.exports = mongoose.model("Formulario", formularioSchema);
