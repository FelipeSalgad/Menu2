import "../Estilos/Menu.css";
import PropTypes from "prop-types";
import { useState } from "react";
import img from "../json/img.js";
import { useCarrito } from "../context/CarritoContext.jsx";

/*
const comidas = [
    {
        id: 1,
        nombre: "Penne a la bolognesa",
        descripcion: "Penne, macaco, cilantro, queso, sí, Cebolla, Zanahoria, Apio",
        precio: 35000,
    },
    {
        id: 2,
        nombre: "Tagliatelle marinara",
        descripcion: "Tagliatelle con salsa marinara y mariscos frescos.",
        precio: 40000,
    },
    {
        id: 3,
        nombre: "Risotto de setas",
        descripcion: "Arroz cremoso con una mezcla de setas frescas.",
        precio: 37000,
    },
    {
        id: 4,
        nombre: "Croquetas de queso",
        descripcion: "Deliciosas croquetas rellenas de queso.",
        precio: 25000,
    },
    {
        id: 5,
        nombre: "Pancakes de arándanos",
        descripcion: "Pancakes esponjosos con arándanos frescos.",
        precio: 20000,
    }
];
*/
/*
const bebidas = [
    {
        id: 6,
        nombre: "Café americano",
        descripcion: "Café negro recién preparado.",
        precio: 8000,
    },
    {
        id: 7,
        nombre: "Té helado",
        descripcion: "Té refrescante servido con hielo y limón.",
        precio: 10000,
    },
    {
        id: 8,
        nombre: "Limonada natural",
        descripcion: "Limonada fresca con un toque de menta.",
        precio: 12000,
    },
    {
        id: 9,
        nombre: "Batido de fresa",
        descripcion: "Batido cremoso hecho con fresas frescas.",
        precio: 15000,
    }
];
*/
export default function Menu({ isVisible, toggleCart, productos, restauranteInfo }) {
  const [activeTab, setActiveTab] = useState("comidas");
  const {agregarAlCarrito} = useCarrito();

  const handleAddToCart = (producto, restauranteInfo) => {
    console.log("restaurante info:", restauranteInfo);
    agregarAlCarrito(producto, restauranteInfo);
  };

  if (!isVisible) return null;

  //const items = activeTab === "comidas" ? comidas : bebidas;
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
                className="btn-agregar"
                onClick={() => handleAddToCart(item, restauranteInfo)}
              >
                Añadir al carrito
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
