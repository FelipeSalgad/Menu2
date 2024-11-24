import "../Estilos/Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer_links">
                <Link to="/#" >About</Link>
                <Link to="/#" >Read Our Blog</Link>
                <Link to="/#" >Sign Up to Deliver</Link>
                <Link to="/#" >Add Your Restaurant</Link>
                <Link to="/#" >Get Help</Link>
                <Link to="/#" >See More</Link>
                <Link to="/#" >See Less</Link>
            </div>
            <div className="footer_social">
                <Link to="/#" aria-label="Twitter"><i className="fab fa-twitter"></i> </Link>
                <Link to="/#" aria-label="Facebook"><i className="fab fa-facebook"></i> </Link>
                <Link to="/#" aria-label="Instagram"><i className="fab fa-instagram"></i> </Link>
            </div>
            <div className="footer_copyright">
                © 2024 Menu, Inc. All rights reserved
            </div>
        </footer>
    );
}
