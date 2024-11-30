import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../Estilos/InfoPerfil.css";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext.jsx";

export default function InfoPerfil() {
  const navigate = useNavigate(); // Inicializar useNavigate
  const [isLoggedIn, setIsLoggedIn] = useState();
  const { logout } = useAuth();

  const initialValues = {
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
    contrasena: "",
    fechaNacimiento: "",
    genero: "",
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirige a la página de inicio de sesión
    }
  }, []);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    // Obtener datos del usuario cuando se monta el componente
    const cargarDatosUsuario = async () => {
      try {
        const respuesta = await localStorage.getItem(
          "token",
          response.data.token
        );
        const usuario = respuesta.data[0];
        setInitialValues({
          nombre: response.data.nombre,
          apellido: response.data.apellido,
          correo: response.data.correo,  
          telefono: response.data.telefono,
          direccion: response.data.direccion,
          contrasena: response.data.contrasena,
          fechaNacimiento: response.data.fechaNacimiento,
        });
        setLoading(false); // Termina la carga
      } catch (error) {
        console.log("Error al cargar los datos del usuario:", error);
        setLoading(false); // Termina la carga incluso si ocurre un error
      }
    };
    cargarDatosUsuario();
  }, []);

  const handleLogout = () => {
    if (window.confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <div className="perfil-content">
      <h2>Información de tu cuenta</h2>
      <Formik initialValues={initialValues}>
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
          <div className="form-group">
            <label>Género</label>
            <div className="gen-group">
              <label>
                <Field type="radio" value="hombre" /> Hombre
              </label>
              <label>
                <Field type="radio" value="mujer" /> Mujer
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn actualizar">
              Actualizar datos
            </button>
            <button
              type="button"
              className="btn cerrar"
              onClick={handleLogout} // Llamar a handleLogout al hacer clic
            >
              Cerrar sesión
            </button>
            <button type="buttsubmiton" className="btn eliminar">
              Eliminar mi cuenta
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
