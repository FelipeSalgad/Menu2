import { useState, useEffect, useContext } from "react";
import InfoPerfil from "../components/InfoPerfil";
import UltimasOrdenes from "../components/UltimasOrdenes";
import "../Estilos/Perfil.css";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import axios from "axios";
import { ClienteContext } from "../context/ClienteContext"; // Importar el contexto

export default function Perfil() {
  const navigate = useNavigate(); // Inicializar useNavigate
  const { cliente, setCliente } = useContext(ClienteContext); // Acceder al contexto
  const [selectedSection, setSelectedSection] = useState(null);
  const [avatar, setAvatar] = useState(cliente?.imagen_perfil || "https://via.placeholder.com/80");
  const [userName, setUserName] = useState(cliente?.nombre || "");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) { //Si el careverga no está logeado lo manda pal login
      navigate("/login");
    }

    if (cliente) {
      setUserName(cliente.nombre);
      setAvatar(cliente.imagen_perfil || "https://via.placeholder.com/80");
    }
  }, [cliente, navigate]);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const base64Image = e.target.result;
        setAvatar(base64Image);
        try {
          const response = await axios.put(
            `https://menuapi-4u6v.onrender.com/api/updateCliente/${cliente.id_cliente}`,
            { imagen_perfil: base64Image }
          );

          if (response.status === 200) {
            setCliente({ ...cliente, imagen_perfil: base64Image });
            alert("Imagen actualizada exitosamente");
          }
        } catch (error) {
          console.error("Error al actualizar la imagen:", error);
          alert("Ocurrió un error al actualizar la imagen.");
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "infoPerfil":
        return <InfoPerfil setUserName={setUserName} />;
      case "ultimasOrdenes":
        return <UltimasOrdenes />;
      default:
        return <div className="placeholder">Seleccione una opción</div>;
    }
  };

  return (
    <div className="perfil-container">
      <div className="separador">
        <div className="perfil-izq">
          <img src={avatar} alt="Perfil" className="perfil-avatar" />
          <h3 className="perfil-nombre">{userName || "Nombre no disponible"}</h3>
          <label className="file-label" htmlFor="avatar-upload">
            Cambiar avatar
          </label>
          <input
            type="file"
            id="avatar-upload"
            accept="image/*"
            onChange={handleAvatarChange}
            className="file-input"
          />
          <ul className="perfil-menu">
            <li
              onClick={() => setSelectedSection("infoPerfil")}
              className={selectedSection === "infoPerfil" ? "active" : ""}
            >
              <i className="fa-solid fa-gear"></i> Actualizar datos
            </li>
            <li
              onClick={() => setSelectedSection("ultimasOrdenes")}
              className={selectedSection === "ultimasOrdenes" ? "active" : ""}
            >
              <i className="fa-solid fa-clipboard-list"></i> Últimas órdenes
            </li>
          </ul>
        </div>
      </div>
      <div className="perfil-content">{renderSection()}</div>
    </div>
  );
}
