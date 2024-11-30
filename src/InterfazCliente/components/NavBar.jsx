import "../Estilos/NavBar.css";
import { Link } from "react-router-dom";
import img from "../json/img";
import { useState, useEffect } from "react";
import Carrito from "./Carrito";
import { useAuth } from "../context/authContext";

export default function NavBar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={img.logoNegro} className="logo_img" alt="logo" />
        </Link>
      </div>
      <div className="right-section">
        <div className="navegation">
          <Link to="/favoritos">
            <i className="fa-regular fa-heart"></i> Favoritos
          </Link>
          <Carrito className="carrito-icon" />
        </div>
        <div className="button">
          {!isLoggedIn ? (
            <Link
              className="button_login"
              to="/login"
              //onClick={handleLoginToggle}
            >
              Iniciar sesión
            </Link>
          ) : (
            <Link to="/perfil">
              <i className="fa-solid fa-user-circle profile-icon"></i>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
