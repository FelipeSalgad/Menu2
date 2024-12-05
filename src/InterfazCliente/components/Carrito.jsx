import { useState, useEffect, useContext } from "react";
import "../Estilos/Carrito.css";
import img from "../json/img";
import { useCarrito } from "../context/CarritoContext";
import { ClienteContext } from "../context/ClienteContext";

export default function Carrito() {
  const { cliente } = useContext(ClienteContext); // Acceder al contexto
  const [isCarritoOpen, setIsCarritoOpen] = useState(false);
  const { carrito, agregarAlCarrito, eliminarDelCarrito, disminuirCantidad } =
    useCarrito();

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

  const hacerCompra = async () => {
    // Agrupar productos por restaurante
    const pedidosPorRestaurante = carrito.map((restaurante) => {
      return {
        id_restaurante: restaurante.id_restaurante,
        nombre_restaurante: restaurante.nombre,
        productos: restaurante.productos.map((producto) => ({
          id_producto: producto.id_producto,
          cantidad: producto.cantidad,
          observaciones: producto.observaciones || null,
        })),
        monto_total: restaurante.productos.reduce(
          (total, producto) => total + producto.precio * producto.cantidad,
          0
        ),
      };
    });
    //console.log(pedidosPorRestaurante);
    // Realizar una petición POST para cada restaurante
    for (const pedido of pedidosPorRestaurante) {
      try {
        const response = await fetch("https://menuapi-4u6v.onrender.com/api/pedido", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_cliente: cliente.id_cliente,
            id_restaurante: pedido.id_restaurante,
            monto_total: pedido.monto_total,
            estado: "pendiente",
            metodo_pago: "efectivo", //Esto cambia cuando se implemente la pasarela de pago
            productos: pedido.productos,
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Error al registrar pedido para el restaurante ${pedido.nombre_restaurante}: ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log(
          `Pedido registrado para ${pedido.nombre_restaurante}:`,
          data
        );
      } catch (error) {
        console.error("Error al realizar la compra:", error.message);
        alert(
          `Hubo un error al procesar el pedido para el restaurante ${pedido.nombre_restaurante}. Inténtalo de nuevo.`
        );
      }
    }

    // Mostrar un mensaje de éxito y vaciar el carrito
    alert("Todos los pedidos se han procesado correctamente.");
    toggleCarrito();
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
          {carrito.length === 0 ||
          carrito.every((rest) => rest.productos.length === 0) ? (
            <div className="carrito-vacio">
              <img src={img.runRun} alt="" />
              <p>Tu carrito está vacio</p>
              <h2>Llénalo de</h2>
              <h1>SABOR</h1>
            </div>
          ) : (
            carrito.map((restaurante) => (
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
            ))
          )}
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
            <button className="confirmar" onClick={hacerCompra}>
              Confirmar pedido
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
