import { Link } from "react-router-dom";
import PropTypes from "prop-types"; 
import "../Estilos/CardRestaurante.css";

export default function CardRestaurante({ data }) {
    return (
        <div className="restaurant-grid">
            {data.map((item) => (
                <div key={item.id} className="restaurant-card">
                    <div className="restaurant-image">
                        <img src={item.logo} alt={item.title} />
                        <span className="restaurant-tag">{item.tag}</span>
                    </div>
                    <div className="restaurant-content">
                        <h1 className="restaurant-title">{item.title}</h1>
                        {item.description && (
                            <p className="restaurant-description">{item.description}</p>
                        )}
                        <p className="restaurant-price">{item.price}</p>
                        <div className="restaurant-buttons">
                            <Link className="button-primary" to="/menu">
                                Ver Menú
                            </Link>
                            <Link className="button-secondary" to="/reserva">
                                Reservar Mesa
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}


//tenia un error en el data y mi mejor amigo dio esta solucion, igual esto es nomas para probar como se ve
//no se si el back quede asi...
// Validación de las props con PropTypes
CardRestaurante.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            logo: PropTypes.string.isRequired,
            tag: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            price: PropTypes.string.isRequired,
        })
    ).isRequired, // La prop `data` es obligatoria y debe ser un array de objetos
};
