import "./Navbar.css";

function Navbar() {
  const linksConectado = () => {
    return (
      <>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Cuenta
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Cerrar Sesion
          </a>
        </li>
      </>
    );
  };

  const linksDesconectado = () => {
    return (
      <>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Iniciar Sesion
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Registrarse
          </a>
        </li>
      </>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Municipalidad de Azul
          </a>
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
                <a className="nav-link active" aria-current="page" href="#">
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Preguntas frecuentes
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
              {/* {linksConectado()} */}
              {linksDesconectado()}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
