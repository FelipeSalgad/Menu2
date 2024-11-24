import "../Estilos/Login.css";
import { Form, Formik, Field } from "formik";
import { Link } from "react-router-dom";

export default function Login() {
    const initialValues = {
        correo: "",
        contrasena: "",
    };

    return (
        <>
            <div className="login_container">
                <div className="container">
                    <h2 className="login_title">Bienvenido de vuelta</h2>
                    <Formik initialValues={initialValues}>
                        <Form className="form_cont">
                            <div className="input_group">
                                <label htmlFor="email">Correo</label>
                                <Field
                                    className="input"
                                    type="email"
                                    name="correo"
                                    placeholder="Correo"
                                />
                            </div>
                            <div className="input_group">
                                <label htmlFor="password">Constraseña</label>
                                <Field
                                    className="input"
                                    type="password"
                                    name="Constraseña"
                                    placeholder="Constraseña"
                                />
                            </div>
                            <div className="options">
                                <div className="remember_me">
                                    <Field type="checkbox" name="rememberMe" />
                                    <label htmlFor="rememberMe"> Recordar contraseña</label>
                                </div>
                                <Link to="/" className="forgot_password">
                                    Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <button className="btn_login" type="submit">Sign in</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
}
