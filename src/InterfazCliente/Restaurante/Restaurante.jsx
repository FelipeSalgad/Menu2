import "../Estilos/Restaurante.css";
import img from "../json/img";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Menu from "./Menu";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Restaurante() {
  const { id } = useParams(); // Debes obtener el id del restaurante desde la URL
  const [restauranteInfo, setRestauranteInfo] = useState({ categorias: null });
  const [productos, setProductos] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [nuevaOpinion, setNuevaOpinion] = useState("");
  const [opinionesActuales, setOpinionesActuales] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  
  const fetchOpiniones = async () => {
    console.log(localStorage);
    try {
      const response = await axios.get(
        `https://menuapi-4u6v.onrender.com/api/resena/restaurante/${id}`
      );
      if (response.data.message) {
      } else {
        // Mapear opiniones y obtener los nombres de los clientes en paralelo
        const opiniones = await Promise.all(
          response.data.map(async (opinionData) => {
            const { nombreCliente, imagen_perfil } = await fetchCliente(
              opinionData.id_cliente
            );
            return {
              cliente: nombreCliente,
              comentario: opinionData.comentario,
              calificacion: opinionData.calificacion,
              fecha_publicacion: opinionData.fecha_publicacion,
              imagen_perfil: imagen_perfil,
            };
          })
        );
        // Aquí puedes establecer el estado o manejar el resultado
        setOpinionesActuales(opiniones);
      }
    } catch (error) {
      console.error("Error al cargar las opiniones:", error);
    }
  };

  const fetchCliente = async (id_cliente) => {
    try {
      const response = await axios.get(
        `https://menuapi-4u6v.onrender.com/api/getCliente/${id_cliente}`
      );
      if (response.data.message) {
        return "Cliente desconocido"; // Valor por //defecto en caso de error
      } else {
        return {
          nombreCliente: response.data[0].nombre,
          imagen_perfil: response.data[0].imagen_perfil,
        };
      }
    } catch (error) {
      console.error("Error al cargar el cliente:", error);
      return "Cliente desconocido"; // Valor por defecto en caso de error
    }
  };

  useEffect(() => {
    const cachedData = JSON.parse(localStorage.getItem("restaurantesCache"));

    if (!cachedData || !cachedData.restaurantes) {
      return; // Si no hay datos en el cache, no hacer nada
    }

    const restaurante = cachedData.restaurantes.find(
      (restaurante) => restaurante.id_restaurante === id
    );
    setRestauranteInfo(restaurante);
    const productosFiltrados = cachedData.productos.filter(
      (producto) => producto.id_restaurante === restaurante.id_restaurante
    );
    setProductos(productosFiltrados);
    if (!restaurante) {
      return; // Si no se encuentra el restaurante, no hacer nada
    }

    //setRestauranteInfo((prevInfo) => {
    //  // Evitar sobrescribir el estado si ya está cargado
    //  if (prevInfo.id_restaurante === restaurante.id_restaurante)
    //    return prevInfo;
    //  return restaurante;
    //});

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
    fetchOpiniones();
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

  const handleOpinionSubmit = async (e) => {
    e.preventDefault();
    const storedCliente = JSON.parse(localStorage.getItem("cliente"));

    // Calcular la fecha directamente
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const día = String(hoy.getDate()).padStart(2, "0");
    const fechaActual = `${año}/${mes}/${día}`;

    if (nuevaOpinion.trim() !== "") {
      const nuevaOpinionObj = {
        id_cliente: storedCliente.id,
        id_restaurante: restauranteInfo.id_restaurante,
        calificacion: 0,
        comentario: nuevaOpinion,
        fecha_publicacion: fechaActual, // Usamos la fecha calculada
      };

      try {
        const response = await axios.post(
          `https://menuapi-4u6v.onrender.com/api/resena`,
          nuevaOpinionObj
        );
        if (response.data.message) {
          return response.data.message;
        } else {
          fetchOpiniones(); // Actualizar las opiniones
          setNuevaOpinion("");
          return response.data.message;
        }
      } catch (error) {
        console.error("Error al crear la reseña:", error);
        return "Cliente desconocido"; 
      }
    } else {
      alert("Ponga un comentario, maricón");
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
            <img
              src={opinion.imagen_perfil}
              alt={opinion.cliente}
              className="avatar"
            />
            <p>
              <strong>{opinion.cliente}</strong>: {opinion.comentario}
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
        restauranteInfo={restauranteInfo}
      />
    </div>
  );
}
