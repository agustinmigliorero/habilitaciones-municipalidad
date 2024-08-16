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
  fechaCreacion: { type: Date, default: Date.now }, // Marca de tiempo para la creación del expediente
  fechaActualizacion: { type: Date, default: Date.now }, // Marca de tiempo para la última actualización
});

const expedienteSchema = new Schema({
  formularios: [respuestaFormularioSchema],
  estado: {
    type: String,
    default: "pendiente",
    enum: ["pendiente", "aprobado", "rechazado"],
  }, // Validación de estado
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  fechaCreacion: { type: Date, default: Date.now }, // Marca de tiempo para la creación del expediente
  fechaActualizacion: { type: Date, default: Date.now }, // Marca de tiempo para la última actualización
});

expedienteSchema.pre("save", function (next) {
  this.fechaActualizacion = Date.now();
  next();
});

module.exports = mongoose.model("Expediente", expedienteSchema);
