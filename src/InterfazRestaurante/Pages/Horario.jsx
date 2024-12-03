import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // Para validaciones

export default function HorarioForm() {
  // Esquema de validación para horarios
  const validationSchema = Yup.object(
    Object.fromEntries(
      [].map((dia) => [
        dia,
        Yup.string()
          .required(`El horario de ${dia} es obligatorio`)
          .matches(/^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/, "Formato inválido, use HH:MM-HH:MM"),
      ])
    )
  );

  const initialValues = {
    lunes: "",
    martes: "",
    miercoles: "",
    jueves: "",
    viernes: "",
    sabado: "",
    domingo: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Horario registrado:", values);
    // Aquí envías la información al backend
    resetForm(); // Limpia el formulario tras el envío
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="form">
          <h2>Registrar Horario</h2>
          {Object.keys(initialValues).map((dia) => (
            <div key={dia} className="form-field">
              <label>
                {dia.charAt(0).toUpperCase() + dia.slice(1)}:
                <Field
                  type="text"
                  name={dia}
                  placeholder="Ejemplo: 08:00-16:00"
                />
              </label>
              {errors[dia] && touched[dia] && (
                <div className="error">{errors[dia]}</div>
              )}
            </div>
          ))}
          <button type="submit">Registrar</button>
        </Form>
      )}
    </Formik>
  );
}
