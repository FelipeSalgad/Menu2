import "../Estilos/Menu.css";
import PropTypes from "prop-types";
import { useState } from "react";
import img from "../json/img.js";
import { useCarrito } from "../context/CarritoContext.jsx";

export default function Menu({ isVisible, toggleCart, productos, restauranteInfo }) {
  const [activeTab, setActiveTab] = useState("comidas");
  const [clickedItemId, setClickedItemId] = useState(null);
  const { agregarAlCarrito } = useCarrito();

  const handleAddToCart = (producto, restauranteInfo) => {
    setClickedItemId(producto.id_producto);
    setTimeout(() => setClickedItemId(null), 1000); // Tiempo de mensaje "Agregado"
    agregarAlCarrito(producto, restauranteInfo);
  };

  if (!isVisible) return null;

  const items = productos;

  return (
    <div className="modal-menu">
      <div className="menu-contenido">
        <button className="cerrar-menu" onClick={toggleCart}>
          X
        </button>
        <h2>Menú</h2>
        <div className="menu-tabs">
          <button
            className={`tab ${activeTab === "comidas" ? "tab-activo" : ""}`}
            onClick={() => setActiveTab("comidas")}
          >
            Comidas
          </button>
          <button
            className={`tab ${activeTab === "bebidas" ? "tab-activo" : ""}`}
            onClick={() => setActiveTab("bebidas")}
          >
            Bebidas
          </button>
        </div>
        <div className="menu-items">
          {items.map((item) => (
            <div key={item.id_producto} className="menu-item">
              <img
                src={img.macaco}
                alt={item.nombre}
                className="menu-item-imagen"
              />
              <h3>{item.nombre}</h3>
              <p>{item.descripcion}</p>
              <span className="menu-item-precio">
                ${item.precio.toLocaleString()}
              </span>
              <button
                className={`btn-agregar ${
                  clickedItemId === item.id_producto ? "btn-agregado" : ""
                }`}
                onClick={() => handleAddToCart(item, restauranteInfo)}
              >
                {clickedItemId === item.id_producto ? "¡Agregado!" : "Añadir al carrito"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Menu.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  toggleCart: PropTypes.func.isRequired,
  productos: PropTypes.array.isRequired,
};
