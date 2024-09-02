const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const expedienteSchema = new Schema({
  formularios: [{ type: Schema.Types.ObjectId, ref: "RespuestaFormulario" }],
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
