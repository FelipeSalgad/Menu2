import "../Estilos/Register.css";
import { Form, Formik, Field } from "formik";
import { Link } from "react-router-dom";

export default function Register() {
    const initialValues = {
        nombre: "",
        apellido: "",
        correo: "",
        contrasena: "",
        confirmarContrasena: "",
    };

    return (
        <>
            <div className="register_container">
                <div className="container_register">
                    <h2 className="register_title">Crea tu cuenta</h2>
                    <Formik initialValues={initialValues}>
                        <Form className="form_cont_register">
                            <div className="input_group_r">
                                <label htmlFor="nombre">Nombre</label>
                                <Field
                                    className="input"
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre"
                                />
                            </div>
                            <div className="input_group_r">
                                <label htmlFor="apellido">Apellido</label>
                                <Field
                                    className="input"
                                    type="text"
                                    name="apellido"
                                    placeholder="Apellido"
                                />
                            </div>
                            <div className="input_group_r">
                                <label htmlFor="correo">Correo</label>
                                <Field
                                    className="input"
                                    type="email"
                                    name="correo"
                                    placeholder="Correo"
                                />
                            </div>
                            <div className="input_group_r">
                                <label htmlFor="contrasena">Contraseña</label>
                                <Field
                                    className="input"
                                    type="password"
                                    name="contrasena"
                                    placeholder="Contraseña"
                                />
                            </div>
                            <div className="input_group_r">
                                <label htmlFor="confirmarContrasena">Confirmar Contraseña</label>
                                <Field
                                    className="input"
                                    type="password"
                                    name="confirmarContrasena"
                                    placeholder="Confirmar Contraseña"
                                />
                            </div>
                            <button className="btn_register" type="submit">Registrarse</button>
                        </Form>
                    </Formik>
                    <div className="link_container_register">
                        <span>¿Ya tienes una cuenta?</span>
                        <Link to="/login" className="link_register">Iniciar sesión</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
