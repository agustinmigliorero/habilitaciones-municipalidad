import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import LogoMunicipalidad from "../assets/logo-municipio.png";

function Navbar({ usuarioLogeado, setUsuarioLogeado }) {
  const linksConectado = () => {
    if (usuarioLogeado.logeado) {
      return (
        <>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to={`/ver-usuario/${usuarioLogeado.usuario._id}`}
            >
              Hola! {usuarioLogeado.usuario.nombre}{" "}
              {usuarioLogeado.usuario.apellido}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className="nav-link"
              to={`/expedientes/${usuarioLogeado.usuario._id}`}
            >
              Mis Expedientes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              onClick={cerrarSesion}
              className="nav-link"
              to={"/desconectarse"}
            >
              Cerrar Sesion
            </NavLink>
          </li>
        </>
      );
    }
  };

  const linksAdmin = () => {
    if (
      usuarioLogeado.logeado &&
      (usuarioLogeado.usuario.rol === "habilitaciones" ||
        usuarioLogeado.usuario.rol === "administrador")
    ) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to={"/ver-usuarios"}>
              Usuarios
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={`/vertodosexpedientes`}>
              Expedientes
            </NavLink>
          </li>
        </>
      );
    }
  };

  const linksDesconectado = () => {
    if (!usuarioLogeado.logeado) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link" to={"/iniciar-sesion"}>
              Iniciar Sesion
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={"/registrarse"}>
              Registrarse
            </NavLink>
          </li>
        </>
      );
    }
  };

  const cerrarSesion = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/cerrar-sesion`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUsuarioLogeado(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#">
            Municipalidad de Azul
          </a> */}

          <Link className="navbar-brand" to={"/"}>
            <img
              src={LogoMunicipalidad}
              style={{ maxWidth: "180px", maxHeight: "48px" }}
              alt="Logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to={"/"}>
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to={"/preguntas-frecuentes"}
                >
                  Preguntas frecuentes
                </NavLink>
              </li>
              {linksAdmin()}
            </ul>
            <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
              {linksConectado()}
              {linksDesconectado()}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
