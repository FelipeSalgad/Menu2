export default function UltimasOrdenes() {
    const orders = [
        { id: 1, producto: "Producto A", fecha: "2024-11-20", estado: "Entregado" },
        { id: 2, producto: "Producto B", fecha: "2024-11-18", estado: "En tránsito" },
        { id: 3, producto: "Producto C", fecha: "2024-11-15", estado: "Cancelado" },
    ];

    return (
        <div>
            <h2>Últimas Órdenes</h2>
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>
                        <strong>Producto:</strong> {order.producto} <br />
                        <strong>Fecha:</strong> {order.fecha} <br />
                        <strong>Estado:</strong> {order.estado}
                    </li>
                ))}
            </ul>
        </div>
    );
}
