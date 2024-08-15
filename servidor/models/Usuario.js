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
});

module.exports = mongoose.model("Usuario", usuarioSchema);
