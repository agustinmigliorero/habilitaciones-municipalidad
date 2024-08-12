const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const usuarioSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
  },
});

usuarioSchema.methods.serialize = function () {
  return {
    id: this.id,
    user: this.user,
    googleId: this.googleId,
  };
};

module.exports = mongoose.model("Usuario", usuarioSchema);
