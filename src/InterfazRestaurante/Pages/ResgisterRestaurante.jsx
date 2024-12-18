import { Form, Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";
import imgSocio from "../json/imgSocio";
import axios from "axios"; 

export default function RegisterRestaurante() {
  const initialValues = {
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    contrasena: "",
    confirmarContrasena: "",
  };
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    // Validaciones de campos vacíos
    if (
      !values.nombre ||
      !values.apellido ||
      !values.correo ||
      !values.telefono ||
      !values.contrasena ||
      !values.confirmarContrasena
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Validación de coincidencia de contraseñas
    if (values.contrasena !== values.confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      // Realizar la petición POST a /createCliente
      const response = await axios.post(
        "http://localhost:3000/api/createSocio",
        values
      );

      // Si la respuesta es 200, el registro fue exitoso
      if (response.status === 200) {
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        navigate("/socio"); // Redirigir al login después del registro
      }
    } catch (error) {
      console.error("Error al registrar el socio:", error);
      alert("Hubo un error en el registro. Intenta de nuevo.");
    }
  };
  return (
    <div className="register-container">
      <div className="register-left">
        <div className="logo-centro">
          <img src={imgSocio.logoBlanco} className="register-logo" alt="logo" />
        </div>
        <h2 className="register-welcome">Tu viaje comienza aquí</h2>
        <p className="register-description">
          Regístrate y brinda experiencias culinarias a miles de clientes.
        </p>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="register-form">
            <div className="register-field">
              <label htmlFor="nombre">Nombre(s)</label>
              <Field
                className="register-input"
                type="text"
                name="nombre"
                placeholder="Nombre(s)"
              />
            </div>
            <div className="register-field">
              <label htmlFor="apellido">Apellidos</label>
              <Field
                className="register-input"
                type="text"
                name="apellido"
                placeholder="apellidos"
              />
            </div>
            <div className="register-field">
              <label htmlFor="correo">Correo Electrónico</label>
              <Field
                className="register-input"
                type="email"
                name="correo"
                placeholder="Correo Electrónico"
              />
            </div>
            <div className="register-field">
              <label htmlFor="telefono">Teléfono</label>
              <Field
                className="register-input"
                type="text"
                name="telefono"
                placeholder="telefono"
              />
            </div>
            <div className="register-field">
              <label htmlFor="contrasena">Contraseña</label>
              <Field
                className="register-input"
                type="password"
                name="contrasena"
                placeholder="Contraseña"
              />
            </div>
            <div className="register-field">
              <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
              <Field
                className="register-input"
                type="password"
                name="confirmarContrasena"
                placeholder="Confirmar Contraseña"
              />
            </div>
            <button type="submit" className="register-button">
              Unirse
            </button>
          </Form>
        </Formik>
      </div>
      <div className="register-right">
        <img
          src={imgSocio.copa}
          className="register-image"
          alt="Platos deliciosos"
        />
      </div>
    </div>
  );
}
