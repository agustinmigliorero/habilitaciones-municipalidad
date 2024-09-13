function Alerta({ alerta }) {
  return (
    <>
      <center>
        <div
          className={
            alerta.estilo === "success"
              ? "alert alert-success d-flex align-items-center w-50 mt-4 mb-4"
              : "alert alert-danger d-flex align-items-center w-50 mt-4 mb-4"
          }
          role="alert"
        >
          <svg
            className="bi flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Danger:"
          >
            <use xlinkHref="#exclamation-triangle-fill" />
          </svg>
          <div style={{ margin: "auto" }}>{alerta.mensaje}</div>
        </div>
      </center>
    </>
  );
}

export default Alerta;
