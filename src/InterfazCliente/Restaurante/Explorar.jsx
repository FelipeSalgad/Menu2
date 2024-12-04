import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Estilos/Explorar.css";
import CardRestaurante from "../components/CardRestaurante";
import axios from "axios";

export default function Explorar() {
  const location = useLocation(); // Para acceder al state pasado en la navegación
  const [restaurantes, setRestaurantes] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [todo, setTodo] = useState([]);
  const [categories, setCategories] = useState({});
  const [activeTab, setActiveTab] = useState("Todo");

  useEffect(() => {
    async function fetchResena() {
      try {
        const response = await axios.get(
          `https://menuapi-4u6v.onrender.com/api/resena`
        );
        if (response.data.message) {
        } else {
          const opiniones = response.data;
          localStorage.setItem("opiniones", JSON.stringify(opiniones));
        }
      } catch (error) {
        console.error("Error al cargar las opiniones:", error);
      }
    }
    async function fetchClientes() {
      try {
        const response = await axios.get(
          "https://menuapi-4u6v.onrender.com/api/getClientes"
        );
        localStorage.setItem("clientes", JSON.stringify(response.data));

      } catch (error) {
        console.error("Error al cargar los clientes:", error);
      }
    }
    fetchResena();
    fetchClientes();
  }, []);

  useEffect(() => {
    if (location.state && location.state.filtro) {
      setActiveTab(location.state.filtro); // Configura el filtro inicial
    }
  }, [location.state]);

  useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("restaurantesCache")));
    const fetchData = async () => {
      try {
        // Mostrar datos en caché si existen
        const cachedData = JSON.parse(
          localStorage.getItem("restaurantesCache")
        );
        if (
          cachedData.restaurantes &&
          cachedData.categorias &&
          cachedData.productos
        ) {
          //console.log("LocalStorage");
          processAndSetData(
            cachedData.restaurantes,
            cachedData.categorias,
            cachedData.productos
          );
        }

        // Hacer la petición para actualizar los datos
        const [restauranteRes, categoriasRes, productoRes] = await Promise.all([
          fetch("https://menuapi-4u6v.onrender.com/api/restaurante"),
          fetch("https://menuapi-4u6v.onrender.com/api/categoria"),
          fetch("https://menuapi-4u6v.onrender.com/api/producto"),
        ]);

        // Verificar si las respuestas son exitosas
        if (restauranteRes.ok && categoriasRes.ok && productoRes.ok) {
          const restaurantesData = await restauranteRes.json();
          const categoriasData = await categoriasRes.json();
          const comidasData = await productoRes.json();

          // Guardar nuevos datos en caché
          localStorage.setItem(
            "restaurantesCache",
            JSON.stringify({
              restaurantes: restaurantesData,
              categorias: categoriasData,
              productos: comidasData,
            })
          );

          // Actualizar los datos en el estado
          processAndSetData(restaurantesData, categoriasData, comidasData);
        } else {
          console.warn(
            "Alguna de las respuestas no fue exitosa. Manteniendo datos en caché."
          );
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, []);

  const processAndSetData = (restaurantesData, categoriasData, comidasData) => {
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
    setComidas(comidasData);
    setTodo([...restaurantesWithCategories, ...comidasData]);
  };

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
