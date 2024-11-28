export default function Favoritos() {
    const favoritos = [
        { id: 1, nombre: "Producto A", categoria: "Categoría 1" },
        { id: 2, nombre: "Producto B", categoria: "Categoría 2" },
        { id: 3, nombre: "Producto C", categoria: "Categoría 3" },
    ];

    return (
        <div>
            <h2>Favoritos</h2>
            <ul>
                {favoritos.map((favorito) => (
                    <li key={favorito.id}>
                        <strong>Nombre:</strong> {favorito.nombre} <br />
                        <strong>Categoría:</strong> {favorito.categoria}
                    </li>
                ))}
            </ul>
        </div>
    );
}
