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
            ubicacion: "Apartadó",
            description: "",
            rating: "4.9/5 (370)",
            price: "Desde $30.000",
        },
        {
            id: 2,
            logo: img.Aida,
            tag: "Restaurante genérico",
            title: "Hamburguesa Aida",
            ubicacion: "Apartadó",
            description: "La que sufre soy yo",
            rating: "",
            price: "",
        },
        {
            id: 3,
            logo: img.zaza,
            tag: "Restaurante genérico",
            title: "Zazaza Yakuza",
            ubicacion: "Apartadó",
            description: "",
            rating: "4.8/5 (220)",
            price: "",
        },
        {
            id: 4,
            logo: img.LaPutadetuTia,
            tag: "Café & Repostería",
            title: "Café al Punto",
            ubicacion: "Bogotá",
            description: "El mejor café de la ciudad.",
            rating: "4.7/5 (450)",
            price: "Desde $20.000",
        },
        {
            id: 5,
            logo: img.Aida,
            tag: "Comida Rápida",
            title: "Hot Dog Express",
            ubicacion: "Medellín",
            description: "Hot dogs hechos con amor.",
            rating: "4.5/5 (310)",
            price: "Desde $12.000",
        },
        {
            id: 6,
            logo: img.zaza,
            tag: "Comida Japonesa",
            title: "Ramen Sensación",
            ubicacion: "Cali",
            description: "Siente el sabor de Japón.",
            rating: "4.9/5 (500)",
            price: "Desde $45.000",
        },
        {
            id: 7,
            logo: img.LaPutadetuTia,
            tag: "Comida Mexicana",
            title: "Taco Rey",
            ubicacion: "Cartagena",
            description: "Auténticos tacos mexicanos.",
            rating: "4.6/5 (350)",
            price: "Desde $25.000",
        },
        {
            id: 8,
            logo: img.Aida,
            tag: "Parrilla",
            title: "Asados Don Julio",
            ubicacion: "Barranquilla",
            description: "Carnes a la parrilla de alta calidad.",
            rating: "4.8/5 (400)",
            price: "Desde $40.000",
        },
        {
            id: 9,
            logo: img.zaza,
            tag: "Pizza Gourmet",
            title: "Pizza al Fuego",
            ubicacion: "Bucaramanga",
            description: "Sabores únicos en cada bocado.",
            rating: "4.7/5 (360)",
            price: "Desde $30.000",
        },
        {
            id: 10,
            logo: img.LaPutadetuTia,
            tag: "Comida Vegana",
            title: "Green Delights",
            ubicacion: "Cali",
            description: "Una experiencia vegana inolvidable.",
            rating: "4.8/5 (200)",
            price: "Desde $25.000",
        },
        {
            id: 11,
            logo: img.Aida,
            tag: "Comida Peruana",
            title: "Sazón Inca",
            ubicacion: "Medellín",
            description: "Descubre los sabores del Perú.",
            rating: "4.9/5 (430)",
            price: "Desde $50.000",
        },
        {
            id: 12,
            logo: img.zaza,
            tag: "Mariscos",
            title: "Mar y Sol",
            ubicacion: "Cartagena",
            description: "Delicias del mar servidas frescas.",
            rating: "4.6/5 (320)",
            price: "Desde $35.000",
        },
        {
            id: 13,
            logo: img.LaPutadetuTia,
            tag: "Desayunos",
            title: "Amanecer Tropical",
            ubicacion: "Santa Marta",
            description: "El mejor inicio para tu día.",
            rating: "4.8/5 (270)",
            price: "Desde $15.000",
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
            id: 2,
            logo: img.macaco,
            tag: "Postres",
            title: "Sopa de macaco",
            description: "Una explosión de sabores.",
            price: "Desde $10.000",
        },
        {
            id: 3,
            logo: img.logo,
            tag: "Entradas",
            title: "Bruschetta Clásica",
            description: "Pan italiano con tomate y albahaca.",
            price: "Desde $12.000",
        },
        {
            id: 4,
            logo: img.macaco,
            tag: "Plato Fuerte",
            title: "Lomo Saltado",
            description: "Clásico plato peruano.",
            price: "Desde $40.000",
        },
        {
            id: 5,
            logo: img.logo,
            tag: "Postres",
            title: "Brownie con Helado",
            description: "Perfecta combinación de chocolate y vainilla.",
            price: "Desde $18.000",
        },
        {
            id: 6,
            logo: img.macaco,
            tag: "Bebidas",
            title: "Limonada de Coco",
            description: "Fresca y tropical.",
            price: "Desde $8.000",
        },
        {
            id: 7,
            logo: img.logo,
            tag: "Plato Fuerte",
            title: "Pollo Teriyaki",
            description: "Acompañado de arroz y verduras.",
            price: "Desde $30.000",
        },
        {
            id: 8,
            logo: img.macaco,
            tag: "Bebidas",
            title: "Mojito Clásico",
            description: "Refrescante bebida con menta.",
            price: "Desde $15.000",
        },
        {
            id: 9,
            logo: img.logo,
            tag: "Plato Fuerte",
            title: "Pizza Margarita",
            description: "Sencilla y deliciosa.",
            price: "Desde $25.000",
        },
        {
            id: 10,
            logo: img.macaco,
            tag: "Postres",
            title: "Tiramisú",
            description: "El clásico italiano.",
            price: "Desde $20.000",
        },
        {
            id: 11,
            logo: img.logo,
            tag: "Entradas",
            title: "Nachos Especiales",
            description: "Con queso, guacamole y carne.",
            price: "Desde $18.000",
        },
        {
            id: 12,
            logo: img.macaco,
            tag: "Bebidas",
            title: "Jugo Natural",
            description: "Elige tu fruta favorita.",
            price: "Desde $6.000",
        },
        {
            id: 13,
            logo: img.logo,
            tag: "Postres",
            title: "Flan de Caramelo",
            description: "Dulce y cremoso.",
            price: "Desde $12.000",
        },
        {
            id: 14,
            logo: img.macaco,
            tag: "Plato Fuerte",
            title: "Sushi Roll",
            description: "Fresco y delicioso.",
            price: "Desde $28.000",
        },
        {
            id: 15,
            logo: img.logo,
            tag: "Postres",
            title: "Cheesecake",
            description: "Con base de galleta.",
            price: "Desde $22.000",
        },
        {
            id: 16,
            logo: img.macaco,
            tag: "Bebidas",
            title: "Café Latte",
            description: "Café con leche espumosa.",
            price: "Desde $10.000",
        },
    ];
    
    //aca esto deberia ser aleatoriamente, para que no muestre los restaurantes y luego las comidas
    //pero aja no le supe
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
