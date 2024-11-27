import "../Estilos/NavBar.css";
import { Link } from "react-router-dom";
import img from "../json/img";
import { useState } from "react";

export default function NavBar() {
    //esto es para ver como se ve el nav estan logueado o no.
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const handleLoginToggle = () => {
        setIsLoggedIn(!isLoggedIn); 
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/"><img src={img.logoNegro} className="logo_img" alt="logo" /></Link>
            </div>
            <div className="right-section">
                <div className="navegation">
                    <Link to="/favoritos">
                        <i className="fa-regular fa-heart"></i> Favoritos
                    </Link>
                    <Link to="/cart">
                        <i className="fa-solid fa-cart-shopping"></i> Carrito
                    </Link>
                </div>
                <div className="button">
                    {!isLoggedIn ? (
                        <Link className="button_login" to="/login" onClick={handleLoginToggle}>
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
