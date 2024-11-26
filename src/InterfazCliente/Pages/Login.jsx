import "../Estilos/Login.css";
import { Form, Formik, Field } from "formik";
import img from "../json/img.js";
import { Link } from "react-router-dom";

export default function Login() {
    const initialValues = {
        correo: "",
        contrasena: "",
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
                <Formik initialValues={initialValues}>
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
                        <Link className="login-button" to="/explorar">¡A comer!</Link>
                    </Form>
                </Formik>
            </div>
            <div className="login-right">
                <img src={img.doPlato} className="login-image" alt="Platos deliciosos" />
            </div>
        </div>
    );
}
