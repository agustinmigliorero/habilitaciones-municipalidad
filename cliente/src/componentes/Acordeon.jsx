function Acordeon({ items }) {
  return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
      {items.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2
            className="accordion-header"
            id={"panelsStayOpen-heading" + index}
          >
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={"#panelsStayOpen-collapse" + index}
              aria-expanded="false"
              aria-controls={"panelsStayOpen-collapse" + index}
            >
              <b style={{ fontSize: "1.25rem" }}>{item.titulo}</b>
            </button>
          </h2>
          <div
            id={"panelsStayOpen-collapse" + index}
            className="accordion-collapse collapse"
            aria-labelledby={"panelsStayOpen-heading" + index}
          >
            <div className="accordion-body">
              {item.texto.split("\n").map((linea, index) => (
                <p style={{ textAlign: "justify" }} key={index}>
                  {linea}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Acordeon;
