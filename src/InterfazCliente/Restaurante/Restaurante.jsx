import '../Estilos/Restaurante.css';
import img from "../json/img";
import { Link } from "react-router-dom";
import { useState } from "react";
import Menu from "./Menu";

export default function Restaurante() {
    const restauranteInfo = {
        nombre: "Laputa Detu Tia ",
        subtitulo: "Comida italiana auténtica en el corazón de la ciudad.",
        calificacion: "4.9/5",
        reseñas: 370,
        estado: "Cerrado",
        horario: "Abre a las 9 a.m. mañana",
        categorias: "Italiana, Pastas, Pizzería",
        descripcion:
            "Laputa Detu Tia es un rincón acogedor que te transporta directamente a las calles de Italia. Desde sus mesas decoradas con manteles a cuadros hasta el irresistible aroma de las pizzas recién salidas del horno de leña, cada detalle está pensado para ofrecerte una experiencia auténtica.",
    };

    const opiniones = [
        { usuario: "Lucho", texto: "Lorem Ipsum es simplemente texto de relleno..." },
        { usuario: "Mauro", texto: "Al contrario del pensamiento popular..." },
        { usuario: "Negro", texto: "El texto de Lorem Ipsum no es aleatorio..." },
        { usuario: "Palida", texto: "Tiene raíces clásicas en la literatura latina..." },
    ];

    const [isFavorited, setIsFavorited] = useState(false);
    const [nuevaOpinion, setNuevaOpinion] = useState("");
    const [opinionesActuales, setOpinionesActuales] = useState(opiniones);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const toggleCart = () => {
        setIsCartVisible(!isCartVisible);
    };

    const handleFavoriteClick = () => setIsFavorited(!isFavorited);

    const handleOpinionChange = (e) => setNuevaOpinion(e.target.value);

    const handleOpinionSubmit = (e) => {
        e.preventDefault();
        if (nuevaOpinion.trim() !== "") {
            const nuevaOpinionObj = { usuario: "Usuario Anónimo", texto: nuevaOpinion };
            setOpinionesActuales([...opinionesActuales, nuevaOpinionObj]);
            setNuevaOpinion("");
        }
    };

    return (
        <div className="restaurante-container">
            <div className="restaurante-header">
                <img
                    src={img.LaPutadetuTia}
                    alt="Restaurante"
                    className="restaurante-imagen"
                />
                <div className="restaurante-descripcion">
                    <h1 className="restaurante-titulo">
                        {restauranteInfo.nombre}
                        <Link onClick={handleFavoriteClick}>
                            <i
                                className={`fa-heart ${
                                    isFavorited ? "fa-solid heart-animation" : "fa-regular"
                                }`}
                            ></i>
                        </Link>
                    </h1>
                    <p className="restaurante-subtitulo">{restauranteInfo.subtitulo}</p>
                    <p className="restaurante-detalle">
                        <div className="calificacion">
                            <i className="fa-solid fa-star"></i> {restauranteInfo.calificacion} (
                            {restauranteInfo.reseñas})
                        </div>
                        <div className="estado">
                            <span className="restaurante-estado">{restauranteInfo.estado}</span> ·{" "}
                            {restauranteInfo.horario}
                        </div>
                    </p>
                    <p className="restaurante-categorias">
                        Categorías: {restauranteInfo.categorias}
                    </p>
                    <p className="restaurante-texto">{restauranteInfo.descripcion}</p>
                </div>
            </div>
            <div className="restaurante-opciones">
                <Link className="btn-ver-mapa">
                    <img src={img.mapa} alt="" className="icono" />
                    <span>Ver en el mapa</span>
                </Link>
                <button className="btn-menu" onClick={toggleCart}>
                    <img src={img.menu} alt="Menú" className="icono" />
                    <span>Menú</span>
                </button>
            </div>

            <div className="restaurante-opiniones">
                <h2>Opiniones</h2>
                {opinionesActuales.map((opinion, index) => (
                    <div className="opinion" key={index}>
                        <img src={img.gatoTonto} alt={opinion.usuario} className="avatar" />
                        <p>
                            <strong>{opinion.usuario}</strong>: {opinion.texto}
                        </p>
                    </div>
                ))}
                <div className="nueva-opinion">
                    <h3>Deja tu opinión</h3>
                    <form onSubmit={handleOpinionSubmit}>
                        <textarea
                            value={nuevaOpinion}
                            onChange={handleOpinionChange}
                            placeholder="Escribe aquí tu opinión..."
                            rows="4"
                            className="textarea-opinion"
                        ></textarea>
                        <button type="submit" className="btn-enviar-opinion">
                            Enviar Opinión
                        </button>
                    </form>
                </div>
            </div>
            <Menu isVisible={isCartVisible} toggleCart={toggleCart} />
        </div>
    );
}
