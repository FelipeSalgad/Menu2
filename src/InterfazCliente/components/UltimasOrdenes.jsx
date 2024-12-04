import { useState, useEffect, useContext } from "react";

import "../Estilos/UltimasOrde.css";
import img from "../json/img";
import { ClienteContext } from "../context/ClienteContext";

export default function UltimasOrdenes() {
  const { cliente } = useContext(ClienteContext); // Acceder al contexto
  const [ordenes, setOrdenes] = useState([]);
  /*
  const ordenes = [
    {
      id: 1,
      restaurante: "Restaurante de Francisco",
      hora: "8:55 P.M.",
      estado: "Entregado",
      productos: [
        {
          id: 1,
          nombre: "Sopa do macaco",
          precio: 48900,
          cantidad: 1,
          imagen: img.Aida,
        },
        {
          id: 2,
          nombre: "Hamburguesas de Aida",
          precio: 27000,
          cantidad: 1,
          imagen: img.LaPutadetuTia,
        },
      ],
      subtotal: 109900,
    },
    {
      id: 2,
      restaurante: "Pizzería Don Giovanni",
      hora: "7:30 P.M.",
      estado: "Pendiente",
      productos: [
        {
          id: 1,
          nombre: "Pizza Margarita",
          precio: 35000,
          cantidad: 1,
          imagen: img.Pizza,
        },
        {
          id: 2,
          nombre: "Calzone de Jamón",
          precio: 25000,
          cantidad: 2,
          imagen: img.Calzone,
        },
      ],
      subtotal: 85000,
    },
    {
      id: 3,
      restaurante: "Tu puta prra madre",
      hora: "7:30 P.M.",
      estado: "Cancelado",
      productos: [
        {
          id: 1,
          nombre: "Pizza Margarita",
          precio: 35000,
          cantidad: 1,
          imagen: img.Pizza,
        },
        {
          id: 2,
          nombre: "Calzone de Jamón",
          precio: 25000,
          cantidad: 2,
          imagen: img.Calzone,
        },
      ],
      subtotal: 85000,
    },
  ];
  */
  useEffect(() => {
    // Función para cargar las órdenes del usuario
    const cargarOrdenes = async () => {
      try {
        // Obtener las órdenes del usuario
        const responsePedidos = await fetch(
          `https://menuapi-4u6v.onrender.com/api/pedido/${cliente.id}`
        );
        const pedidos = await responsePedidos.json();

        const restaurantesLocalStorage =
          JSON.parse(localStorage.getItem("restaurantesCache")).restaurantes ||
          [];

        // Iterar sobre los pedidos y formatear los datos
        const productosDePedidos = await Promise.all(
          pedidos.map(async (pedido) => {
            const responseProductos = await fetch(
              `https://menuapi-4u6v.onrender.com/api/pedido-producto/${pedido.id_pedido}`
            );
            const productos = await responseProductos.json();

            // Combinar con información de localStorage
            const productosLocalStorage =
              JSON.parse(localStorage.getItem("restaurantesCache")).productos ||
              [];

            // Crear productos detallados con datos de localStorage
            const productosDetallados = productos.map((producto) => {
              const productoInfo = productosLocalStorage.find(
                (p) => p.id_producto === producto.id_producto
              );

              return {
                nombre: productoInfo?.nombre || "Producto desconocido",
                precio: productoInfo?.precio || 0,
                cantidad: producto.cantidad,
                imagen: productoInfo?.imagen || "",
              };
            });

            // Calcular el subtotal del pedido
            //const subtotal = productosDetallados.reduce(
            //  (acc, producto) => acc + producto.precio * producto.cantidad,
            //  0
            //);

            const restauranteInfo = restaurantesLocalStorage.find(
              (r) => r.id_restaurante === pedido.id_restaurante
            );

            // Formatear la orden completa
            return {
              restaurante: restauranteInfo?.nombre || "Restaurante desconocido",
              imagen_restaurante: restauranteInfo?.logo,
              hora: pedido.fecha_hora,
              estado: pedido.estado,
              productos: productosDetallados,
              subtotal: pedido.monto_total,
            };
          })
        );

        setOrdenes(productosDePedidos);
      } catch (error) {
        console.error("Error al cargar órdenes:", error);
      }
    };

    cargarOrdenes();
  }, []);

  return (
    <div className="ultimas-ordenes">
      <h3>¿Te gustó? Pídelo otra vez</h3>
      <br />
      {ordenes.map((orden) => (
        <div key={orden.id_pedido} className="orden-card">
          <div className="orden-header">
            <img
              className="orden-restaurante-logo"
              src={orden.imagen_restaurante}
              alt="Logo del restaurante"
            />
            <div className="nombre-hora">
              <p className="orden-restaurante">{orden.restaurante}</p>
              <p className="orden-hora">{orden.hora}</p>
            </div>
            <span
              className={`orden-estado ${
                orden.estado.toLowerCase() === "entregado"
                  ? "estado-entregado"
                  : orden.estado.toLowerCase() === "pendiente"
                  ? "estado-pendiente"
                  : "estado-cancelado"
              }`}
            >
              {orden.estado}
            </span>
          </div>
          <div className="orden-productos">
            {orden.productos.map((producto) => (
              <div key={producto.id_producto} className="orden-producto">
                <img
                  className="producto-imagen"
                  src={producto.imagen}
                  alt={producto.nombre}
                />
                <div className="producto-info">
                  <p>{producto.nombre}</p>
                  <p>Unidad(es): {producto.cantidad}</p>
                </div>
                <p className="producto-precio">
                  ${producto.precio.toLocaleString("es-CO")}
                </p>
              </div>
            ))}
          </div>
          <div className="orden-footer">
            <p className="orden-subtotal">
              Subtotal: ${orden.subtotal.toLocaleString("es-CO")}
            </p>
            <button className="orden-reordenar">Ordenar otra vez</button>
          </div>
        </div>
      ))}
    </div>
  );
}
