import "../Estilos/Login.css";
import { Form, Formik, Field } from "formik";
import img from "../json/img.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const initialValues = {
        correo: "",
        contrasena: "",
    };

    const navigate = useNavigate(); // Para redirigir a otra página en caso de éxito

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post("http://localhost:3000/api/loginCliente", values);
            if (response.status === 200) {
                // Aquí puedes guardar el token en localStorage o hacer algo más con la respuesta
                localStorage.setItem("token", response.data.token); // Guardar el token
                navigate("/explorar"); // Redirigir a la página de explorar
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            //mostrar mensaje de credenciales inválidas
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <div className="logo-centro">
                    <img src={img.logoBlanco} className="login-logo" alt="logo" />
                </div>
                <h2 className="login-welcome">Bienvenido al sabor</h2>
                <p className="login-description">
                    Descubre el mundo de los sabores. Inicia sesión y deja que tu paladar te guíe.
                </p>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                            <Link className="login-link" to="/*">¿Olvidé mi contraseña?</Link>
                            <Link className="login-link" to="/register">Aún no tengo una cuenta</Link>
                        </div>
                        <button type="submit" className="login-button">¡A comer!</button>
                    </Form>
                </Formik>
            </div>
            <div className="login-right">
                <img src={img.doPlato} className="login-image" alt="Platos deliciosos" />
            </div>
        </div>
    );
}
