import { useState } from "react";
import "../Estilos/Explorar.css";
import CardRestaurante from "../components/CardRestaurante";
import img from "../json/img";

export default function Explorar() {
    //Datos de prueba porque soy un tipo chill y tranquilo.
    const restaurantes = [
        {
            id: 1,
            logo: img.LaPutadetuTia,
            tag: "Comida Italiana",
            title: "Laputa Detu Tía",
            description: "Apartadó",
            rating: "4.9/5 (370)",
            price: "Desde $30.000",
        },
        {
            id: 2,
            logo: img.Aida,
            tag: "Restaurante genérico",
            title: "Hamburguesa de Aida",
            description: "La que sufre soy yo",
            rating: "",
            price: "$27.000",
        },
        {
            id: 3,
            logo: img.zaza,
            tag: "Restaurante genérico",
            title: "Zazaza Yakuza",
            description: "",
            rating: "4.8/5 (220)",
            price: "$27.000",
        },
    ];

    const comidas = [
        {
            id: 1,
            logo: img.logo,
            tag: "Postres",
            title: "Helado Tropical",
            description: "Una explosión de frutas.",
            price: "Desde $15.000",
        },
        {
            id: 1,
            logo: img.macaco,
            tag: "Postres",
            title: "Sapa de macaco",
            description: "Una explosión de sabores.",
            price: "Desde $10.000",
        },
    ];
    const todo = [...restaurantes, ...comidas];

    const [activeTab, setActiveTab] = useState("Todo");
    
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
                <div className="search-input">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        placeholder="¿Qué se te antoja hoy?"
                        className="input-field"
                    />
                    <button className="search-button">Buscar</button>
                </div>
            </div>
            <div className="content">
                <CardRestaurante data={getActiveData()} />
            </div>
        </div>
    );
}
