import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    // Leer el carrito desde localStorage al iniciar
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    // Guardar el carrito en localStorage cada vez que cambie
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto, restaurante) => {
    setCarrito((prev) => {
      const nuevoProducto = {
        id_producto: producto.id_producto,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1, // Initial quantity is always 1
      };

      const restauranteExistente = prev.find(
        (item) => item.id_restaurante === restaurante.id_restaurante
      );

      if (restauranteExistente) {
        return prev.map((item) =>
          item.id_restaurante === restaurante.id_restaurante
            ? {
                ...item,
                productos: item.productos.some(
                  (prod) => prod.id_producto === nuevoProducto.id_producto
                )
                  ? item.productos.map((prod) =>
                      prod.id_producto === nuevoProducto.id_producto
                        ? { ...prod, cantidad: prod.cantidad + 1 }
                        : prod
                    )
                  : [...item.productos, nuevoProducto],
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id_restaurante: restaurante.id_restaurante,
            nombre: restaurante.nombre,
            productos: [nuevoProducto],
          },
        ];
      }
    });
  };

  const disminuirCantidad = (idProducto, idRestaurante) => {
    setCarrito((prev) => {
      return prev.map((item) =>
        item.id_restaurante === idRestaurante
          ? {
              ...item,
              productos: item.productos
                .map((prod) =>
                  prod.id_producto === idProducto
                    ? {
                        ...prod,
                        cantidad: prod.cantidad > 1 ? prod.cantidad - 1 : 0,
                      }
                    : prod
                )
                .filter((prod) => prod.cantidad > 0), // Eliminar el producto si la cantidad llega a 0
            }
          : item
      );
    });
  };

  const eliminarDelCarrito = (idProducto, idRestaurante) => {
    setCarrito((prev) => {
      return prev
        .map((item) => {
          if (item.id_restaurante === idRestaurante) {
            const productosActualizados = item.productos.filter(
              (prod) => prod.id_producto !== idProducto
            );
            return { ...item, productos: productosActualizados };
          }
          return item;
        })
        .filter((item) => item.productos.length > 0);
    });
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, disminuirCantidad }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
