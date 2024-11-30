import PropTypes from "prop-types";
import "../Estilos/CardRestaurante.css";
import { Link } from "react-router-dom";
import img from "../json/img";

export default function CardRestaurante({ data }) {
  return (
    <Link to="/restaurante" className="navegation-register">
      <div className="restaurant-grid">
        {data.map((item) => (
          <div key={item.id_restaurante} className="restaurant-card">
            <div className="restaurant-image-container">
              <img
                className="restaurant-image"
                src={ 
                  item.logo
                    ? item.logo
                        .replace(/^url\(['"]?/, "")
                        .replace(/['"]?\)$/, "")
                    : img.defaultLogo // Hay que poner una imagen por defecto si el restaurante no tiene logo
                }
                alt={item.nombre_restaurante}
              />
              {/* el icono de la etiqueta deberia cambiar dependiendo de si es restaurante o plato, pero no se como hacer eso */}
              {item.tag && (
                <span className="restaurant-tag">
                  {" "}
                  <i className="fa-solid fa-utensils"></i> {item.tag}
                </span>
              )}
            </div>
            <div className="restaurant-info">
              <h2 className="restaurant-title">{item.nombre_restaurante}</h2>
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
              {/*<p className="restaurant-price">{item.price}</p>*/}
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
}

// Validación de las props con PropTypes
CardRestaurante.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id_restaurante: PropTypes.string.isRequired,
      //logo: PropTypes.string.isRequired,
      id_categoria: PropTypes.string,
      nombre_restaurante: PropTypes.string.isRequired,
      descripcion: PropTypes.string,
      direccion: PropTypes.string,
      calificacion: PropTypes.string, //string?
      //price: PropTypes.string.isRequired,
    })
  ).isRequired,
};
