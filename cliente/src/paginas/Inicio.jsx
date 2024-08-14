function Inicio({ usuarioLogeado }) {
  console.log(usuarioLogeado);
  return (
    <div style={{ textAlign: "center" }}>
      {usuarioLogeado.logeado && (
        <div className="alert alert-success w-75 m-auto mt-3" role="alert">
          Bienvenido! <b>{usuarioLogeado.usuario.user}</b>
        </div>
      )}
      <h1>Inicio</h1>
    </div>
  );
}

export default Inicio;
