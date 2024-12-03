import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // Para validaciones

export default function CategoriaForm() {
  // Esquema de validación para la categoría
  const validationSchema = Yup.object({
    categoria: Yup.string()
      .required("El nombre de la categoría es obligatorio")
      .min(3, "La categoría debe tener al menos 3 caracteres")
      .max(50, "La categoría no puede tener más de 50 caracteres"),
  });

  const initialValues = {
    categoria: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Categoría registrada:", values.categoria);
    // Aquí puedes enviar la información al backend
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
          <h2>Registrar Categoría</h2>
          <div className="form-field">
            <label>
              Nombre de la Categoría:
              <Field
                type="text"
                name="categoria"
                placeholder="Ejemplo: Comida Rápida"
              />
            </label>
            {errors.categoria && touched.categoria && (
              <div className="error">{errors.categoria}</div>
            )}
          </div>
          <button type="submit">Registrar</button>
        </Form>
      )}
    </Formik>
  );
}
