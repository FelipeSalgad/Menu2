import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; // Para validaciones opcionales

export default function ProductoForm() {
  // Esquema de validación opcional usando Yup
  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("El nombre es obligatorio")
      .min(3, "Debe tener al menos 3 caracteres"),
    descripcion: Yup.string()
      .required("La descripción es obligatoria")
      .min(10, "Debe tener al menos 10 caracteres"),
    precio: Yup.number()
      .required("El precio es obligatorio")
      .positive("Debe ser un número positivo")
      .typeError("Debe ser un número válido"),
    imagen: Yup.string().url("Debe ser una URL válida"),
  });

  const initialValues = {
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Producto registrado:", values);
    // Aquí envías la información al backend
    resetForm(); // Limpia el formulario después de enviarlo
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className="form">
          <h2>Registrar Producto</h2>
          <div className="form-field">
            <label>Nombre del Producto:</label>
            <Field
              type="text"
              name="nombre"
              placeholder="Ingrese el nombre del producto"
            />
            {errors.nombre && touched.nombre && (
              <div className="error">{errors.nombre}</div>
            )}
          </div>

          <div className="form-field">
            <label>Descripción:</label>
            <Field
              as="textarea"
              name="descripcion"
              placeholder="Ingrese una descripción"
            />
            {errors.descripcion && touched.descripcion && (
              <div className="error">{errors.descripcion}</div>
            )}
          </div>

          <div className="form-field">
            <label>Precio:</label>
            <Field
              type="number"
              name="precio"
              placeholder="Ingrese el precio"
            />
            {errors.precio && touched.precio && (
              <div className="error">{errors.precio}</div>
            )}
          </div>

          <div className="form-field">
            <label>Imagen (URL):</label>
            <Field
              type="text"
              name="imagen"
              placeholder="Ingrese la URL de la imagen"
            />
            {errors.imagen && touched.imagen && (
              <div className="error">{errors.imagen}</div>
            )}
          </div>

          <button type="submit">Registrar</button>
        </Form>
      )}
    </Formik>
  );
}
