import { Form, Formik, Field } from "formik";
import { Link } from "react-router-dom";
import imgSocio from "../json/imgSocio";
import { useNavigate } from "react-router-dom"; 

export default function LoginRestaurante() {
    const navigate = useNavigate(); // Hook para navegar
    const initialValues = {
        correo: "",
        contrasena: "",
    };
    const handleSubmit = (values) => {
        console.log("Formulario enviado:", values);
        // Aquí podrías validar o enviar los datos al servidor
        navigate("/homeSocio"); // Redirigir al componente Dashboard
    };
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-centro">
            <img src={imgSocio.logoBlanco} className="login-logo" alt="logo" />
        </div>
        <h2 className="login-welcome">Bienvenido a tu cocina digital</h2>
        <p className="login-description">
          Inicia sesión y conecta a tus clientes.
        </p>
        <Formik initialValues={initialValues}
                 onSubmit={handleSubmit} >
          <Form className="login-form">
            <div className="login-field">
              <label htmlFor="correo">Correo Electrónico</label>
              <Field
                className="login-input"
                type="email"
                name="correo"
                placeholder="Correo Electrónico"
              />
            </div>
            <div className="login-field">
              <label htmlFor="contrasena">Contraseña</label>
              <Field
                className="login-input"
                type="password"
                name="contrasena"
                placeholder="Contraseña"
              />
            </div>
            <div className="login-links">
              <Link className="login-link" to="/*">
                ¿Olvidé mi contraseña?
              </Link>
              <Link className="login-link" to='/socioRegis'>
                Aún no soy socio
              </Link>
            </div>
            <button type="submit" className="login-button">
              ¡A vender!
            </button>
          </Form>
        </Formik>
      </div>
      <div className="login-right">
        <img
          src={imgSocio.copaDos}
          className="login-image"
          alt="Platos deliciosos"
        />
      </div>
    </div>
  );
}
