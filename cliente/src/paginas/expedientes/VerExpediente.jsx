import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function VerExpediente() {
  const [expediente, setExpediente] = useState({});

  const { idExpediente } = useParams();

  const fetchExpediente = async () => {
    const respuesta = await fetch(
      `${import.meta.env.VITE_API_URL}/api/expedientes/${idExpediente}`,
      { credentials: "include" }
    );
    const expediente = await respuesta.json();
    setExpediente(expediente);
  };

  useEffect(() => {
    fetchExpediente();
  }, []);

  const exportarPDF = async (index) => {
    let formulario = expediente.formularios[index];
    let respuestasHtml = "";
    for (let i = 0; i < formulario.respuestas.length; i++) {
      if (formulario.respuestas[i].etiqueta !== "Terminos y Condiciones") {
        respuestasHtml += `<p style="text-align: justify; font-size: 16px; font-family: Arial, sans-serif;">
        ${formulario.respuestas[i].etiqueta}: <b>${formulario.respuestas[i].valor}</b>
      </p>`;
      }
    }

    // Renderiza el contenido dentro del componente
    const divPdf = document.createElement("div");
    divPdf.id = "div-pdf";
    divPdf.style.margin = "0 auto";
    divPdf.style.marginTop = "100%";
    divPdf.style.textAlign = "justify";
    divPdf.style.fontFamily = "Arial, sans-serif";
    divPdf.style.width = "37%";
    divPdf.innerHTML = `
      <h1 style="text-align: center;
  background-color: #22376c;
  color: white;
  border-radius: 10px 10px 0px 0px;
  font-size: 28px;
  padding: 5px;">${formulario.idFormulario.nombreFormulario}</h1>
      ${respuestasHtml}
      <p style="text-align: right;">Firma: _______________ </p>
    `;

    // Agrega el div al DOM (por ejemplo, al body)
    document.body.appendChild(divPdf);

    // Captura la imagen con html2canvas
    html2canvas(document.querySelector("#div-pdf")).then((canvas) => {
      // Convierte la imagen capturada en base64
      const imgData = canvas.toDataURL("image/png");

      // Crea un nuevo documento PDF
      const pdf = new jsPDF({ format: "a4" });
      pdf.addImage(imgData, "PNG", 10, 10);

      // Descarga el PDF
      pdf.save(
        `${formulario.idFormulario.nombreFormulario} ${expediente.usuario.nombre} ${expediente.usuario.apellido}.pdf`
      );

      // Limpia el div agregado al DOM
      document.body.removeChild(divPdf);
    });
  };

  const mostrarFormularios = () => {
    let filas;
    if (expediente.formularios !== undefined) {
      filas = expediente.formularios.map((formulario, index) => {
        return (
          <tr key={index}>
            <td>{formulario.idFormulario.nombreFormulario}</td>
            <td>{formulario.estado}</td>
            <td>
              <Link
                to={`/verformulario/${formulario._id}`}
                className="btn btn-info ms-3 me-3"
              >
                <i
                  className="fa-regular fa-file"
                  style={{ fontSize: "1.3rem" }}
                ></i>{" "}
                Ver Formulario
              </Link>
              <Link
                to={`/responderformulario/${formulario._id}`}
                className="btn btn-warning ms-3 me-3"
              >
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{ fontSize: "1.3rem" }}
                ></i>{" "}
                Editar Formulario
              </Link>
              <button
                className="btn btn-danger ms-3 me-3"
                onClick={() => {
                  exportarPDF(index);
                }}
              >
                <i
                  className="fa-solid fa-file-pdf"
                  style={{ fontSize: "1.3rem" }}
                ></i>{" "}
                Exportar PDF
              </button>
            </td>
          </tr>
        );
      });
    }

    return filas;
  };

  let fechaCreacion;
  let fechaActualizacion;
  let stringFechaCreacion;
  let stringFechaActualizacion;
  if (expediente._id != undefined) {
    fechaCreacion = new Date(expediente.fechaCreacion);
    fechaActualizacion = new Date(expediente.fechaActualizacion);
    stringFechaCreacion = `${fechaCreacion.getDate()}/${
      fechaCreacion.getMonth() + 1
    }/${fechaCreacion.getFullYear()} ${fechaCreacion.getHours()}:${fechaCreacion.getMinutes()}:${fechaCreacion.getSeconds()}`;
    stringFechaActualizacion = `${fechaActualizacion.getDate()}/${
      fechaActualizacion.getMonth() + 1
    }/${fechaActualizacion.getFullYear()} ${fechaActualizacion.getHours()}:${fechaActualizacion.getMinutes()}:${fechaActualizacion.getSeconds()}`;
  }
  return (
    <>
      <div style={{ width: "50%", margin: "0 auto", textAlign: "justify" }}>
        <h1 className="text-center">Expediente</h1>
        {expediente._id ? (
          <>
            <h2>ID: {expediente._id}</h2>
            <h2>
              Persona: {expediente.usuario.nombre} {expediente.usuario.apellido}
            </h2>
            <h2>Fecha de inicio: {stringFechaCreacion}</h2>
            <h2>Ultima actualizacion: {stringFechaActualizacion}</h2>
          </>
        ) : (
          ""
        )}
      </div>
      <div style={{ width: "60%", margin: "0 auto", textAlign: "justify" }}>
        <h2 className="text-center mt-4 mb-3">Formularios:</h2>
        <table>
          <thead>
            <tr>
              <th>Formulario</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{mostrarFormularios()}</tbody>
        </table>
      </div>
    </>
  );
}

export default VerExpediente;
