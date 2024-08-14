import "./IniciarSesion.css";
import GoogleLogo from "../../assets/google-logo.jpg";

function IniciarSesion() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Iniciar Sesion con Google</h1>
      {/* <button className="btn-google">
        <img src={GoogleLogo} alt="Google Logo" /> Iniciar Sesion
      </button> */}
      <div className="row justify-content-center">
        <div className="col-md-3">
          <a
            className="btn btn-outline-dark"
            href="http://localhost:3000/auth/google"
            role="button"
            style={{ textTransform: "none" }}
          >
            <img
              style={{ marginBottom: "3px", marginRight: "5px", width: "20px" }}
              alt="Iniciar Sesion con Google"
              src={GoogleLogo}
            />
            Iniciar Sesion con Google
          </a>
        </div>
      </div>
    </div>
  );
}

export default IniciarSesion;
