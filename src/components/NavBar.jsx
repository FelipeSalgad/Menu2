import "../Estilos/NavBar.css";
import { Link } from "react-router-dom";
import img from "../json/img";

export default function NavBar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/"><img src={img.logoNegro} className="logo_img" alt="logo" /></Link>
            </div>
            <div className="right-section">
                <div className="navegation">
                    <Link to="/*">
                        <i className="fa-regular fa-circle-question"></i> Acerca de
                    </Link>
                    <Link to="/*">
                        <i className="fa-regular fa-heart"></i> Favoritos
                    </Link>
                </div>
                <div className="button">
                    <Link className="button_login" to="/login">Iniciar sesión</Link>
                </div>
            </div>
        </nav>
    );
}
