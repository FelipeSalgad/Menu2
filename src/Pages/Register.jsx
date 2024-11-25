import "../Estilos/Register.css";
import { Form, Formik, Field } from "formik";
import { Link } from "react-router-dom";
import img from "../json/img.js";

export default function Register() {
    const initialValues = {
        nombre: "",
        correo: "",
        contrasena: "",
        confirmarContrasena: "",
    };

    return (
        <div className="register-container">
            <div className="register-left">
                <div className="logo-centro">
                    <img src={img.logoBlanco} className="register-logo" alt="logo" />
                </div>
                <h2 className="register-welcome">Tu viaje comienza aquí</h2>
                <p className="register-description">
                    Regístrate y explora miles de experiencias culinarias únicas.
                </p>
                <Formik initialValues={initialValues}>
                    <Form className="register-form">
                        <div className="register-field">
                            <label htmlFor="nombre">Usuario</label>
                            <Field
                                className="register-input"
                                type="text"
                                name="nombre"
                                placeholder="Usuario"
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
                        <Link to="/login" className="register-button" type="submit" >Unirse al banquete</Link>
                    </Form>
                </Formik>
            </div>
            <div className="register-right">
                <img src={img.doPlato} className="register-image" alt="Platos deliciosos" />
            </div>
        </div>
    );
}
