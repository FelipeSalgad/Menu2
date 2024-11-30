import { useState, useEffect } from "react";
import InfoPerfil from "../components/InfoPerfil";
import UltimasOrdenes from "../components/UltimasOrdenes";
import Resenas from "../components/Resenas";
import "../Estilos/Perfil.css";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export default function Perfil() {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedCliente = JSON.parse(localStorage.getItem("cliente"));

    if (!token) {
      navigate("/login"); // Redirige a la página de inicio de sesión
    }
    if (storedCliente) {
      setUserName(storedCliente.nombre);
    }
  }, []);

  
  const [selectedSection, setSelectedSection] = useState(null);
  const [avatar, setAvatar] = useState("https://via.placeholder.com/80");

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "infoPerfil":
        return <InfoPerfil setUserName={setUserName} />;
      case "ultimasOrdenes":
        return <UltimasOrdenes />;
      case "resenas":
        return <Resenas />;
      default:
        return <div className="placeholder">Seleccione una opción</div>;
    }
  };

  return (
    <div className="perfil-container">
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
          <li
            onClick={() => setSelectedSection("resenas")}
            className={selectedSection === "resenas" ? "active" : ""}
          >
            <i className="fa-solid fa-star"></i> Reseñas
          </li>
        </ul>
      </div>
      <div className="perfil-content">{renderSection()}</div>
    </div>
  );
}