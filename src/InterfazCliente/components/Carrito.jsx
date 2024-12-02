import { useState } from "react";
import "../Estilos/Carrito.css";
import img from "../json/img";
import { useCarrito } from "../context/CarritoContext";

/*
const restaurantes = [
  {
    id: 1,
    nombre: "Laputa Detu Tía",
    productos: [
      {
        id: 1,
        nombre: "Sopa do macaco",
        precio: 48900,
        cantidad: 1,
        imagen: img.macaco,
      },
    ],
  },
  {
    id: 2,
    nombre: "Restaurante Generico",
    productos: [
      {
        id: 2,
        nombre: "Hamburguesas de Aida",
        precio: 27000,
        cantidad: 1,
        imagen: img.Aida,
      },
      {
        id: 3,
        nombre: "Sushimbo",
        precio: 34000,
        cantidad: 1,
        imagen: img.logo,
      },
      {
        id: 4,
        nombre: "Hamburguesas de Aida",
        precio: 27000,
        cantidad: 1,
        imagen: img.Aida,
      },
      {
        id: 5,
        nombre: "Sushimbo",
        precio: 34000,
        cantidad: 1,
        imagen: img.logo,
      },
    ],
  },
  {
    id: 3,
    nombre: "deje de ser sapo",
    productos: [
      {
        id: 6,
        nombre: "Hamburguesas de sapo",
        precio: 27000,
        cantidad: 1,
        imagen: img.Aida,
      },
      {
        id: 7,
        nombre: "sapo asao",
        precio: 34000,
        cantidad: 1,
        imagen: img.logo,
      },
      {
        id: 8,
        nombre: "Hamburguesas de Aida",
        precio: 27000,
        cantidad: 1,
        imagen: img.Aida,
      },
      {
        id: 9,
        nombre: "Sushimbo",
        precio: 34000,
        cantidad: 1,
        imagen: img.logo,
      },
      {
        id: 10,
        nombre: "Hamburguesas de Aida",
        precio: 27000,
        cantidad: 1,
        imagen: img.Aida,
      },
      {
        id: 11,
        nombre: "Sushimbo",
        precio: 34000,
        cantidad: 1,
        imagen: img.logo,
      },
    ],
  },
];
*/

export default function Carrito() {
  const [isCarritoOpen, setIsCarritoOpen] = useState(false);
  const { carrito, agregarAlCarrito, eliminarDelCarrito, disminuirCantidad } =
    useCarrito();

  console.log(carrito);
  const toggleCarrito = () => {
    setIsCarritoOpen(!isCarritoOpen);
  };

  const handleCantidadChange = (restauranteId, productoId, operacion) => {
    const restauranteEnCarrito = carrito.find(
      (rest) => rest.id_restaurante === restauranteId
    );

    if (!restauranteEnCarrito) return;

    const productoEnCarrito = restauranteEnCarrito.productos.find(
      (prod) => prod.id_producto === productoId
    );

    if (!productoEnCarrito) return;

    if (operacion === "+") {
      // Aumentar cantidad
      agregarAlCarrito(productoEnCarrito, restauranteEnCarrito);
    } else if (operacion === "-") {
      // Disminuir cantidad
      if (productoEnCarrito.cantidad > 1) {
        disminuirCantidad(productoId, restauranteId);
      } else {
        console.log("eliminar");
        eliminarDelCarrito(productoId, restauranteId);
      }
    }
  };

  const totalProductos = carrito
    .flatMap((restaurante) => restaurante.productos)
    .reduce(
      (total, producto) => total + producto.precio * (producto.cantidad || 1),
      0
    );

  return (
    <>
      <div className="carrito-icon" onClick={toggleCarrito}>
        <i className="fa-solid fa-cart-shopping"></i>
      </div>
      {isCarritoOpen && <div className="overlay" onClick={toggleCarrito}></div>}

      <div className={`carrito-sidebar ${isCarritoOpen ? "open" : ""}`}>
        <div className="carrito-header">
          <h2>
            Tu carrito (
            {carrito.reduce((acc, rest) => acc + rest.productos.length, 0)}{" "}
            productos)
          </h2>
          <button className="close-btn" onClick={toggleCarrito}>
            &times;
          </button>
        </div>
        <div className="carrito-content">
          {carrito.map((restaurante) => (
            <div className="restaurante" key={restaurante.id_restaurante}>
              <h3>
                De: <strong>{restaurante.nombre}</strong>
              </h3>
              {restaurante.productos.map((producto) => (
                <div className="producto" key={producto.id_producto}>
                  <img src={producto.imagen} alt={producto.nombre} />
                  <div>
                    <p>{producto.nombre}</p>
                    <span>${producto.precio.toLocaleString()}</span>
                  </div>
                  <div className="cantidad">
                    <button
                      onClick={() =>
                        handleCantidadChange(
                          restaurante.id_restaurante,
                          producto.id_producto,
                          "-"
                        )
                      }
                    >
                      -
                    </button>
                    <span>{producto.cantidad}</span>
                    <button
                      onClick={() =>
                        handleCantidadChange(
                          restaurante.id_restaurante,
                          producto.id_producto,
                          "+"
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="carrito-footer">
          <p>
            <strong>Total Productos:</strong> ${totalProductos.toLocaleString()}
          </p>
          <p>
            <strong>Total Descuentos:</strong> $0
          </p>
          <p>
            <strong>Subtotal:</strong> ${totalProductos.toLocaleString()}
          </p>
          <div className="botones">
            <button className="seguir-comprando" onClick={toggleCarrito}>
              Seguir comprando
            </button>
            <button className="confirmar">Confirmar pedido</button>
          </div>
        </div>
      </div>
    </>
  );
}
