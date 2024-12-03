import "../Estilos/UltimasOrde.css";
import img from "../json/img";

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
export default function UltimasOrdenes() {
  return (
    <div className="ultimas-ordenes">
      <h3>¿Te gustó? Pídelo otra vez</h3>
      <br />
      {ordenes.map((orden) => (
        <div key={orden.id} className="orden-card">
          <div className="orden-header">
            <img
              className="orden-restaurante-logo"
              src={img.defaultLogo}
              alt="Logo del restaurante"
            />
            <div className="nombre-hora">
              <p className="orden-restaurante">{orden.restaurante}</p>
              <p className="orden-hora">{orden.hora}</p>
            </div>
            <span
              className={`orden-estado ${
                orden.estado.toLowerCase() === 'entregado'
                  ? 'estado-entregado'
                  : orden.estado.toLowerCase() === 'pendiente'
                  ? 'estado-pendiente'
                  : 'estado-cancelado'
              }`}
            >
              {orden.estado}
            </span>
          </div>
          <div className="orden-productos">
            {orden.productos.map((producto) => (
              <div key={producto.id} className="orden-producto">
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
