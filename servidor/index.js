const express = require("express");
const app = express();
const port = 3000;
require("https").globalAgent.options.rejectUnauthorized = false;
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const findOrCreate = require("mongoose-findorcreate");
const Usuario = require("./models/Usuario.js");
require("dotenv").config();

mongoose
  .connect("mongodb://127.0.0.1:27017/prueba-municipalidad", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Origin, Authorization"
  );
  next();
});
//cors

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "aaaa",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      const usuario = await Usuario.findOne({ googleId: profile.id });

      if (usuario) {
        console.log("Usuario encontrado en la base de datos");

        // console.log(usuario);

        return done(null, usuario);
      } else {
        const nuevoUsuario = new Usuario({
          nombre: profile.name.givenName,
          apellido: profile.name.familyName,
          email: profile.emails[0].value,
          imagen: profile.photos[0].value,
          googleId: profile.id,
        });
        await nuevoUsuario.save();
        done(null, nuevoUsuario);
      }
    }
  )
);

// passport.use(Usuario.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  const usuario = Usuario.findById(user._id);
  console.log(user);

  done(null, user);
});

//Generar formularios
const { generarFormularios } = require("./utils.js");
generarFormularios();
//Generar formularios

//Rutas
const usuariosRouter = require("./routes/usuarios.js");
app.use("/api/usuarios", usuariosRouter);

const expedientesRouter = require("./routes/expedientes.js");
app.use("/api/expedientes", expedientesRouter);

const formulariosRouter = require("./routes/formularios.js");
app.use("/api/formularios", formulariosRouter);
//Rutas

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/chequearlogin", (req, res) => {
  res.sendFile(path.join(__dirname, "chequearlogin.html"));
});

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
  console.log(`http://localhost:${port}`);
});
