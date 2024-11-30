import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const ClienteContext = createContext();

// Proveer el contexto
export const ClienteProvider = ({ children }) => {
  // Estado inicial: intenta cargar los datos desde LocalStorage
  const [cliente, setCliente] = useState(() => {
    const storedCliente = localStorage.getItem("cliente");
    return storedCliente ? JSON.parse(storedCliente) : null;
  });

  // Efecto para sincronizar LocalStorage cada vez que el estado 'user' cambie
  useEffect(() => {
    if (cliente) {
      localStorage.setItem("cliente", JSON.stringify(cliente));
    } else {
      localStorage.removeItem("cliente");
    }
  }, [cliente]);

  return (
    <ClienteContext.Provider value={{ cliente, setCliente }}>
      {children}
    </ClienteContext.Provider>
  );
};
