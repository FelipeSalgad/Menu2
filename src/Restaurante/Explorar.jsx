import { useState, useEffect } from "react";
import "../Estilos/Explorar.css";
import CardRestaurante from "../components/CardRestaurante";

export default function Explorar() {
    const [restaurantes, setRestaurantes] = useState([]);
    const [comidas, setComidas] = useState([]);
    const [todo, setTodo] = useState([]);
    const [categories, setCategories] = useState({});
    const [activeTab, setActiveTab] = useState("Todo");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener restaurantes y categorías en paralelo
                const [restauranteRes, categoriasRes] = await Promise.all([
                    fetch("http://localhost:3000/api/restaurante"),
                    fetch("http://localhost:3000/api/categoria"),
                ]);

                const restaurantesData = await restauranteRes.json();
                const categoriasData = await categoriasRes.json();

                // Crear un mapa de id_categoria -> nombre_categoria
                const categoriaMap = categoriasData.reduce((acc, categoria) => {
                    acc[categoria.id_categoria] = categoria.nombre;
                    return acc;
                }, {});

                setCategories(categoriaMap);

                // Agregar el nombre de la categoría a cada restaurante
                const restaurantesWithCategories = restaurantesData.map((restaurante) => ({
                    ...restaurante,
                    tag: categoriaMap[restaurante.id_categoria] || "Sin categoría",
                }));

                setRestaurantes(restaurantesWithCategories);
                setTodo([...restaurantesWithCategories, ...comidas]);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };

        fetchData();
    }, [comidas]); // Si "comidas" cambia, se recalcula "todo"
    //Debería ser productos, luego hacer lo mismo que se hizo con restaurantes, pero como no hay datos, se deja en pendiente

    const getActiveData = () => {
        if (activeTab === "Restaurante") return restaurantes;
        if (activeTab === "Comidas") return comidas;
        return todo;
    };

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="explorar-container">
            <div className="search-bar">
                <div className="search-input">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        placeholder="¿Qué se te antoja hoy?"
                        className="input-field"
                    />
                    <button className="search-button">Buscar</button>
                </div>
                <div className="tabs">
                    <span>Buscar por:</span>
                    <div className="tab-options">
                        <span
                            className={`tab ${activeTab === "Todo" ? "active" : ""}`}
                            onClick={() => handleTabClick("Todo")}
                        >
                            Todo
                        </span>
                        <span
                            className={`tab ${activeTab === "Restaurante" ? "active" : ""}`}
                            onClick={() => handleTabClick("Restaurante")}
                        >
                            Restaurante
                        </span>
                        <span
                            className={`tab ${activeTab === "Comidas" ? "active" : ""}`}
                            onClick={() => handleTabClick("Comidas")}
                        >
                            Comidas
                        </span>
                    </div>
                </div>
            </div>
            <div className="content">
                <CardRestaurante data={getActiveData()} />
            </div>
        </div>
    );
}
