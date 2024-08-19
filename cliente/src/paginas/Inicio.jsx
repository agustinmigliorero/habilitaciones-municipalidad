import { useNavigate } from "react-router-dom";

function Inicio({ usuarioLogeado }) {
  const navigate = useNavigate();

  //Si el usuario esta logeado y le falta rellenar informacion como por ejemplo el DNI, se lo redirige a la pantalla de editar usuario
  //para que complete la informacion faltante.
  if (
    usuarioLogeado.logeado &&
    (!usuarioLogeado.usuario.dni || usuarioLogeado.usuario.dni === "")
  ) {
    navigate(`/editar-usuario/${usuarioLogeado.usuario._id}`);
  }
  console.log(usuarioLogeado);
  return (
    <div style={{ textAlign: "center" }}>
      {usuarioLogeado.logeado && (
        <div className="alert alert-success w-75 m-auto mt-3" role="alert">
          Bienvenido!{" "}
          <b>
            {usuarioLogeado.usuario.nombre}, {usuarioLogeado.usuario.apellido}
          </b>
        </div>
      )}
      <h1>Inicio</h1>
    </div>
  );
}

export default Inicio;
