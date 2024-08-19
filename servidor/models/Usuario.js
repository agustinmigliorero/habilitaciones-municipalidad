const mongoose = require("mongoose");
const { Schema } = require("mongoose");
// const passport = require("passport");
// const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
  },
  googleId: {
    type: String,
  },
  rol: {
    type: String,
    default: "contribuyente", //Estados: "contribuyente", "habilitaciones", "catastro", "planeamiento", "administrador"
    enum: [
      "contribuyente",
      "habilitaciones",
      "catastro",
      "planeamiento",
      "administrador",
    ],
  },
  verificado: {
    type: Boolean,
    default: false,
  },
  dni: {
    type: String,
  },
  expedientes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Expediente",
    },
  ],
});

module.exports = mongoose.model("Usuario", usuarioSchema);
