import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import "../Estilos/HomeRest.css";

export default function HomeRestaurante() {
  const [mostrarFormularioProducto, setMostrarFormularioProducto] = useState(false);
  const formikRef = useRef(null); // Referencia al Formik

  const initialValues = {
    nombreSocio: "",
    apellidoSocio: "",
    correoElectronico: "",
    telefono: "",
    contrasena: "",
    nombreRestaurante: "",
    direccionRestaurante: "",
    telefonoRestaurante: "",
    horarioLunesInicio: "",
    horarioLunesFin: "",
    horarioMartesInicio: "",
    horarioMartesFin: "",
    horarioMiercolesInicio: "",
    horarioMiercolesFin: "",
    horarioJuevesInicio: "",
    horarioJuevesFin: "",
    horarioViernesInicio: "",
    horarioViernesFin: "",
    horarioSabadoInicio: "",
    horarioSabadoFin: "",
    horarioDomingoInicio: "",
    horarioDomingoFin: "",
    nombreProducto: "",
    descripcionProducto: "",
    precio: "",
    imagenUrl: "",
  };
  const handleGuardarRestaurante = (values) => {
    console.log("Datos del Restaurante:", values);
    setMostrarFormularioProducto(true); // Muestra el formulario de productos
  };

  const handleGuardarProducto = (values) => {
    console.log("Datos del Producto:", values);
  };

  return (
    <div className="home-restaurante-container">
      <h1>Información del Restaurante</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleGuardarRestaurante}
        innerRef={formikRef} // Asigna la referencia al Formik
      >
        {({ handleSubmit }) => (
          <Form className="form-columns">
            {/* Columna: Información del Socio */}
            <div className="form-column">
              <h2>Información del Socio</h2>
              <div className="form-field-socio">
                <label>Nombre Socio</label>
                <Field name="nombreSocio" type="text" placeholder="Nombre del socio" />
              </div>
              <div className="form-field-socio">
                <label>Apellido Socio</label>
                <Field name="apellidoSocio" type="text" placeholder="Apellido del socio" />
              </div>
              <div className="form-field-socio">
                <label>Correo Electrónico</label>
                <Field name="correoElectronico" type="email" placeholder="Correo electrónico" />
              </div>
              <div className="form-field-socio">
                <label>Teléfono</label>
                <Field name="telefono" type="tel" placeholder="Teléfono" />
              </div>
              <div className="form-field-socio">
                <label>Contraseña</label>
                <Field name="contrasena" type="password" placeholder="Contraseña" />
              </div>
            </div>

            {/* Columna: Información del Restaurante */}
            <div className="form-column">
              <h2>Información del Restaurante</h2>
              <div className="form-field-socio">
                <label>Nombre del Restaurante</label>
                <Field name="nombreRestaurante" type="text" placeholder="Nombre del restaurante" />
              </div>
              <div className="form-field-socio">
                <label>Dirección</label>
                <Field name="direccionRestaurante" type="text" placeholder="Dirección del restaurante" />
              </div>
              <div className="form-field-socio">
                <label>Teléfono del Restaurante</label>
                <Field name="telefonoRestaurante" type="tel" placeholder="Teléfono del restaurante" />
              </div>
              <h3>Horario de Apertura</h3>
              {/* Campos de horario para cada día de la semana */}
              {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((dia, index) => (
              <div key={index} className="form-field-socio">
                <label>{dia}</label>
                <div className="time-range">
                  <Field
                    name={`horario${dia}Inicio`}
                    type="time"
                    placeholder="Hora de inicio"
                  />
                  <span>hasta</span>
                  <Field
                    name={`horario${dia}Fin`}
                    type="time"
                    placeholder="Hora de fin"
                  />
                </div>
              </div>
              ))}
            </div>
          </Form>
        )}
      </Formik>
      <div className="form-footer">
        <button type="submit" onClick={() => formikRef.current.submitForm()}>
          Guardar Restaurante
        </button>
      </div>
      {/* Formulario del Producto */}
      {mostrarFormularioProducto && (
        <Formik initialValues={initialValues} onSubmit={handleGuardarProducto}>
          {({ handleSubmit }) => (
            <div className="form-columns">
              <div className="form-column">
                <Form onSubmit={handleSubmit}>
                  <h2>Información del Producto</h2>
                  <div className="form-field-socio">
                    <label>Nombre Producto</label>
                    <Field name="nombreProducto" type="text" placeholder="Nombre del producto" />
                  </div>
                  <div className="form-field-socio">
                    <label>Descripción</label>
                    <Field name="descripcionProducto" as="textarea" placeholder="Descripción del producto" />
                  </div>
                  <div className="form-field-socio">
                    <label>Precio</label>
                    <Field name="precio" type="number" placeholder="Precio" />
                  </div>
                  <div className="form-field-socio">
                    <label>Imagen URL</label>
                    <Field name="imagenUrl" type="url" placeholder="URL de la imagen" />
                  </div>
                  <div className="form-footer">
                    <button type="submit" className="submit-button">
                      Guardar Producto
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      )}
    </div>
  );
}
