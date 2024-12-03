import React, { useState } from "react";
import Categoria from "./Categoria";
import Horario from "./Horario";
import Producto from "./Producto";
import '../Estilos/HomeRest.css'

export default function HomeRestaurante() {
  const [currentForm, setCurrentForm] = useState("categoria"); 

  return (
    <div className="home-container">
      <h1>Registrar Restaurante</h1>
      <div className="tabs">
        <button
          onClick={() => setCurrentForm("categoria")}
          className={currentForm === "categoria" ? "active-tab" : ""}
        >
          Categoría
        </button>
        <button
          onClick={() => setCurrentForm("horario")}
          className={currentForm === "horario" ? "active-tab" : ""}
        >
          Horario
        </button>
        <button
          onClick={() => setCurrentForm("producto")}
          className={currentForm === "producto" ? "active-tab" : ""}
        >
          Producto
        </button>
      </div>

      <div className="form-container">
        {currentForm === "categoria" && <Categoria />}
        {currentForm === "horario" && <Horario />}
        {currentForm === "producto" && <Producto />}
      </div>
    </div>
  );
}
