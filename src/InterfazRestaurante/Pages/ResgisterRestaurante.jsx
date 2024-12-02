import { Form, Formik, Field } from "formik";
import imgSocio from "../json/imgSocio";

export default function RegisterRestaurante() {

    const initialValues = {
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        contrasena: "",
        confirmarContrasena: "",
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
                <Formik
                    initialValues={initialValues}
                >
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
                        <button type="submit" className="register-button">Unirse</button>
                    </Form>
                </Formik>
            </div>
            <div className="register-right">
                <img src={imgSocio.copa} className="register-image" alt="Platos deliciosos" />
            </div>
        </div>
    );
}
