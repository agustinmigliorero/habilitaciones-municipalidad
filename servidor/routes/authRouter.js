const express = require("express");
const router = express.Router();
const passport = require("passport");
require("dotenv").config();

router.get("/google", passport.authenticate("google", { scope: "profile" }));

router.get(
  "/google/crear",
  passport.authenticate("google", {
    scope: "profile",
  }),
  (req, res) => {
    req.login(req.user, (err) => {
      if (err) {
        console.log(err);
      }
      console.log(req.session);
      res.json(req.user);
    });
  }
);

router.get("/usuario-logeado", (req, res) => {
  console.log(req.user);
  console.log(req.session);
  console.log(req.cookies);
  if (req.user) {
    res.json(req.user);
  } else {
    res.json({ mensaje: "No hay usuario logeado" });
  }
});

module.exports = router;
