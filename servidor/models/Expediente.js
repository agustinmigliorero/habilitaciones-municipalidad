const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const expedienteSchema = new Schema({
  formularios: [{ type: Schema.Types.ObjectId, ref: "Formulario" }],
  estado: { type: String, default: "pendiente" }, //Estados: "pendiente", "aprobado", "rechazado"
});

module.exports = mongoose.model("Expediente", expedienteSchema);
