const Usuario = require("../models/Usuario");

const verUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();

  res.json(usuarios);
};

const verUsuario = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);
  res.json({ usuario });
};

const autenticarUsuario = async (req, res) => {
  req.login(req.user, (err) => {
    if (err) {
      console.log(err);
    }

    res.redirect("http://localhost:5173/");
  });
};

const cerrarSesion = async (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ usuario: {}, logeado: false, mensaje: "Sesión cerrada" });
  });
};

const verUsuarioLogeado = async (req, res) => {
  if (req.user) {
    res.json({
      usuario: req.user,
      logeado: true,
    });
  } else {
    res.json({ mensaje: "No hay usuario logeado", logeado: false });
  }
};

const editarUsuario = async (req, res) => {
  const { id } = req.params;
  let usuario;
  if (
    req.user &&
    (req.user.rol === "administrador" || req.user.rol === "habilitaciones")
  ) {
    //Verifica que el usuario logeado posea el rol administrador o habilitaciones para poder editar el rol de un usuario
    const { nombre, apellido, email, rol, imagen, verificado, dni } = req.body;
    usuario = await Usuario.findByIdAndUpdate(id, {
      nombre,
      apellido,
      email,
      rol,
      imagen,
      verificado,
      dni,
    });
  } else {
    const { nombre, apellido, email, imagen, dni } = req.body;
    usuario = await Usuario.findByIdAndUpdate(id, {
      nombre,
      apellido,
      email,
      rol,
      imagen,
      dni,
    });
  }

  res.json({ mensaje: "Usuario editado correctamente", usuario });
};

module.exports = {
  autenticarUsuario,
  cerrarSesion,
  verUsuarioLogeado,
  editarUsuario,
  verUsuarios,
  verUsuario,
};
