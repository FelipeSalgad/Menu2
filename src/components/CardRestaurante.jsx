import PropTypes from "prop-types";
import "../Estilos/CardRestaurante.css";
import { Link } from "react-router-dom";

export default function CardRestaurante({ data }) {
    return (
        <Link to="/restaurante" className="navegation-register">        
            <div className="restaurant-grid">
                {data.map((item) => (
                    <div key={item.id} className="restaurant-card">
                        <div className="restaurant-image-container">
                            <img className="restaurant-image" src={item.logo} alt={item.title} />
                            {/* el icono de la etiqueta deberia cambiar dependiendo de si es restaurante o plato, pero no se como hacer eso */}
                            {item.tag && <span className="restaurant-tag"> <i className="fa-solid fa-utensils"></i> {item.tag}</span>}
                        </div>
                        <div className="restaurant-info">
                            <h2 className="restaurant-title">{item.title}</h2>
                            {item.description && (
                                <p className="restaurant-description">{item.description}</p>
                            )}
                            {item.ubicacion && (
                                <p className="restaurant-ubicacion"><i className="fa-solid fa-magnifying-glass"></i>  {item.ubicacion}</p>
                            )}
                            {item.rating && (
                                <p className="restaurant-rating">
                                    <i className="fa-solid fa-star"></i> {item.rating}
                                </p>
                            )}
                            <p className="restaurant-price">{item.price}</p>
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
            id: PropTypes.number.isRequired,
            logo: PropTypes.string.isRequired,
            tag: PropTypes.string, 
            title: PropTypes.string.isRequired,
            description: PropTypes.string, 
            ubicacion: PropTypes.string, 
            rating: PropTypes.string, 
            price: PropTypes.string.isRequired,
        })
    ).isRequired,
};
