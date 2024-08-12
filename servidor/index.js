const express = require("express");
const app = express();
const port = 3000;
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

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );

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
          user: profile.displayName,
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

const authRouter = require("./routes/authRouter.js");
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/chequearlogin", (req, res) => {
  res.sendFile(path.join(__dirname, "chequearlogin.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});