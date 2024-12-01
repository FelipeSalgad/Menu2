import PropTypes from "prop-types";
import "../Estilos/CardRestaurante.css";
import { Link } from "react-router-dom";
import img from "../json/img";

export default function CardRestaurante({ data }) {
  return (
    <div className="restaurant-grid">
      {data.map((item) => (
        <Link
          to={`/restaurante/${item.id_restaurante}`}
          className="navegation-register"
          key={item.id_restaurante + "-" + (item.id_producto || "restaurante")}
        >
          <div
            key={item.id_restaurante + "-" + item.id_producto}
            className="restaurant-card"
          >
            <div className="restaurant-image-container">
              <img
                className="restaurant-image"
                src={
                  item.logo
                    ? item.logo
                        .replace(/^url\(['"]?/, "")
                        .replace(/['"]?\)$/, "")
                    : item.imagen
                    ? item.imagen
                        .replace(/^url\(['"]?/, "")
                        .replace(/['"]?\)$/, "")
                    : img.defaultLogo
                }
                alt={item.nombre}
              />
              {item.tag && (
                <span className="restaurant-tag">
                  <i className="fa-solid fa-utensils"></i> {item.tag}
                </span>
              )}
            </div>
            <div className="restaurant-info">
              <h2 className="restaurant-title">{item.nombre}</h2>
              {item.descripcion && (
                <p className="restaurant-description">{item.descripcion}</p>
              )}
              {item.direccion && (
                <p className="restaurant-ubicacion">
                  <i className="fa-solid fa-magnifying-glass"></i>{" "}
                  {item.direccion}
                </p>
              )}
              {item.calificacion && (
                <p className="restaurant-calificacion">
                  <i className="fa-solid fa-star"></i> {item.calificacion}
                </p>
              )}
              <p className="restaurant-price">{item.precio}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

//// Validación de las props con PropTypes
//CardRestaurante.propTypes = {
//  data: PropTypes.arrayOf(
//    PropTypes.shape({
//      id_restaurante: PropTypes.string.isRequired,
//      logo: PropTypes.string,
//      id_producto: PropTypes.string,
//      nombre: PropTypes.string.isRequired,
//      descripcion: PropTypes.string,
//      direccion: PropTypes.string,
//      calificacion: PropTypes.string,
//      precio: PropTypes.string,
//    })
//  ).isRequired,
//};
