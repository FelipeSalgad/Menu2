import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import "../Estilos/InfoPerfil.css";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext.jsx";
import axios from "axios";

export default function InfoPerfil({setUserName}) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const storedCliente = JSON.parse(localStorage.getItem("cliente"));

  // Estado para los valores iniciales del usuario
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
    contrasena: "",
    fechaNacimiento: "",
    genero: "",
  });

  // Función para limpiar los valores null y transformarlos en cadenas vacías
  const cleanClienteData = (data) => {
    const cleanedData = {};
    for (const key in data) {
      cleanedData[key] =
        data[key] === null || data[key] === undefined ? "" : data[key];
    }
    return cleanedData;
  };

  // Verificar si el usuario tiene un token válido
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      //const storedCliente = JSON.parse(localStorage.getItem("cliente"));
      if (storedCliente) {
        setUserData(cleanClienteData(storedCliente));
      }
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div>Cargando...</div>; // Indicador de carga
  }

  // Manejar cierre de sesión
  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // Eliminar también la información del usuario
      navigate("/");
    }
  };

  const handleSubmit = async (values) => {
    const updatedData = {
      id_cliente: storedCliente.id_cliente,
      nombre: values.nombre,
      apellido: values.apellido,
      correo: values.correo,
      telefono: values.telefono,
      direccion: values.direccion,
      //contrasena: values.contrasena,
      fechaNacimiento: values.fechaNacimiento,
    };
    try {
      console.log(localStorage.getItem("cliente"));
      const response = await axios.put(`https://menuapi-4u6v.onrender.com/api/updateCliente/${storedCliente.id_cliente}`, updatedData);

      if (response.status === 200) {
        setUserName(updatedData.nombre); // Actualizamos el nombre en la página principal
        localStorage.setItem("cliente", JSON.stringify(updatedData)); // Actualizamos los datos en LocalStorage
        alert("¡Información actualizada con éxito!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Hubo un problema al actualizar los datos"}`);
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("Hubo un error al actualizar los datos. Por favor, intenta más tarde.");
    }
  };

  return (
    <div className="perfil-content">
      <h2>Información de tu cuenta</h2>
      <Formik
        initialValues={userData}
        enableReinitialize={true} // Permitir que Formik actualice los valores iniciales dinámicamente
        onSubmit={handleSubmit}
      >
        <Form className="perfil-form">
          <div className="form-group">
            <label>Nombre(s)</label>
            <Field
              type="text"
              name="nombre"
              placeholder="Nombre"
              className="form-field"
            />
          </div>
          <div className="form-group">
            <label>Apellido(s)</label>
            <Field
              type="text"
              name="apellido"
              placeholder="Apellido"
              className="form-field"
            />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <Field
              type="email"
              name="correo"
              placeholder="Correo"
              className="form-field"
            />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <Field
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              className="form-field"
            />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <Field
              type="text"
              name="direccion"
              placeholder="Dirección"
              className="form-field"
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <Field
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              className="form-field"
            />
          </div>
          <div className="form-group">
            <label>Fecha de nacimiento</label>
            <Field type="date" name="fechaNacimiento" className="form-field" />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn actualizar">
              Actualizar datos
            </button>
            <button type="button" className="btn cerrar" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
