import { Link } from "react-router-dom";
import "../Estilos/Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer_links">
                <Link to="/socioRegis">Registra tu restaurante</Link>
                <Link to="/explorar" state={{ filtro: "Restaurante" }}>
                    Restaurantes
                </Link>
                <Link to="/explorar" state={{ filtro: "Comidas" }}>
                    Comidas
                </Link>
            </div>
            <div className="footer_social">
                <Link to="/https://x.com/mauroo__1" aria-label="Twitter"><i className="fab fa-twitter"></i></Link>
                <Link to="/https://www.facebook.com/luisfelipe.salgadomanco/" aria-label="Facebook"><i className="fab fa-facebook"></i></Link>
                <Link to="https://www.instagram.com/mauriciomm_1/" aria-label="Instagram"><i className="fab fa-instagram"></i></Link>
            </div>
            <div className="footer_copyright">
                © 2024 Menu, Inc. All rights reserved
            </div>
        </footer>
    );
}
