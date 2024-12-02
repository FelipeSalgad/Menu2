import "../Estilos/Restaurante.css";
import img from "../json/img";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Menu from "./Menu";
import React from "react";
import { useParams } from "react-router-dom";

export default function Restaurante() {
  const { id } = useParams(); // Debes obtener el id del restaurante desde la URL
  const [restauranteInfo, setRestauranteInfo] = useState({ categorias: null });
  const [productos, setProductos] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [nuevaOpinion, setNuevaOpinion] = useState("");
  const [opinionesActuales, setOpinionesActuales] = useState([
    {
      usuario: "Lucho",
      texto: "Lorem Ipsum es simplemente texto de relleno...",
    },
    { usuario: "Mauro", texto: "Al contrario del pensamiento popular..." },
    { usuario: "Negro", texto: "El texto de Lorem Ipsum no es aleatorio..." },
    {
      usuario: "Palida",
      texto: "Tiene raíces clásicas en la literatura latina...",
    },
  ]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem("restaurantesCache"));

    if (!cachedData || !cachedData.restaurantes) {
      return; // Si no hay datos en el cache, no hacer nada
    }

    const restaurante = cachedData.restaurantes.find(
      (restaurante) => restaurante.id_restaurante === id
    );

    const productosFiltrados = cachedData.productos.filter(
      (producto) => producto.id_restaurante === restaurante.id_restaurante
    );
    setProductos(productosFiltrados);

    if (!restaurante) {
      return; // Si no se encuentra el restaurante, no hacer nada
    }

    setRestauranteInfo((prevInfo) => {
      // Evitar sobrescribir el estado si ya está cargado
      if (prevInfo.id_restaurante === restaurante.id_restaurante)
        return prevInfo;
      return restaurante;
    });

    if (restaurante.id_categoria) {
      const categoriaRestaurante = cachedData.categorias.find(
        (c) => c.id_categoria === restaurante.id_categoria
      );
      if (categoriaRestaurante) {
        setRestauranteInfo((prevState) => ({
          ...prevState,
          categoriaNombre: categoriaRestaurante.nombre,
        }));
      }
    }
  }, [id]); // Solo depende de 'id', que cambia cuando cambias de restaurante

  if (!restauranteInfo) {
    return <div>Cargando...</div>;
  }

  // Funciones de interacción
  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleFavoriteClick = () => setIsFavorited(!isFavorited);

  const handleOpinionChange = (e) => setNuevaOpinion(e.target.value);

  const handleOpinionSubmit = (e) => {
    e.preventDefault();
    if (nuevaOpinion.trim() !== "") {
      const nuevaOpinionObj = {
        usuario: "Usuario Anónimo",
        texto: nuevaOpinion,
      };
      setOpinionesActuales([...opinionesActuales, nuevaOpinionObj]);
      setNuevaOpinion("");
    }
  };

  return (
    <div className="restaurante-container">
      <div className="restaurante-header">
        <img
          src={
            restauranteInfo.logo
              ? restauranteInfo.logo
                  .replace(/^url\(['"]?/, "")
                  .replace(/['"]?\)$/, "")
              : img.defaultLogo
          }
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
          <div className="restaurante-detalle">
            <div className="calificacion">
              <i className="fa-solid fa-star"></i>{" "}
              {restauranteInfo.calificacion} ({restauranteInfo.reseñas})
            </div>
            <div className="estado">
              <span className="restaurante-estado">
                {restauranteInfo.estado}
              </span>{" "}
              · {restauranteInfo.horario}
            </div>
          </div>
          <p className="restaurante-categorias">
            Categoría: {restauranteInfo.categoriaNombre}
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
      <Menu
        isVisible={isCartVisible}
        toggleCart={toggleCart}
        productos={productos || []}
        restauranteInfo = {restauranteInfo}
      />
    </div>
  );
}
