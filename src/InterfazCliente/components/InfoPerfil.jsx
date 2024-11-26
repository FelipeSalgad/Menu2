import { Formik, Form, Field } from "formik";
import "../Estilos/InfoPerfil.css";

export default function InfoPerfil() {
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
                        <Field
                            type="date"
                            name="fechaNacimiento"
                            className="form-field"
                        />
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
                        <button type="submit" className="btn cerrar">
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
