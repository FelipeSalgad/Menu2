export default function Resenas() {
    const resenas = [
        {
            id: 1,
            producto: "Producto A",
            calificacion: 5,
            comentario: "Excelente producto, muy recomendado.",
        },
        {
            id: 2,
            producto: "Producto B",
            calificacion: 4,
            comentario: "Buena calidad, pero el envío tardó un poco.",
        },
        {
            id: 3,
            producto: "Producto C",
            calificacion: 3,
            comentario: "Aceptable, aunque esperaba algo mejor.",
        },
    ];

    return (
        <div>
            <h2>Reseñas</h2>
            <ul>
                {resenas.map((resena) => (
                    <li key={resena.id}>
                        <strong>Producto:</strong> {resena.producto} <br />
                        <strong>Calificación:</strong> {resena.calificacion} / 5 <br />
                        <strong>Comentario:</strong> {resena.comentario}
                    </li>
                ))}
            </ul>
        </div>
    );
}
