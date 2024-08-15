const express = require("express");
const router = express.Router();
const passport = require("passport");
const Usuario = require("../models/Usuario");
require("dotenv").config();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/crear",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  }),
  (req, res) => {
    req.login(req.user, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(req.session);
      //   res.json(req.user);
      res.redirect("http://localhost:5173/");
    });
  }
);

router.get("/cerrar-sesion", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ usuario: {}, logeado: false });
  });
});

router.get("/usuario-logeado", (req, res) => {
  console.log(req.user);
  console.log(req.session);
  console.log(req.cookies);
  if (req.user) {
    res.json({
      usuario: req.user,
      logeado: true,
    });
  } else {
    res.json({ mensaje: "No hay usuario logeado", logeado: false });
  }
});

module.exports = router;
