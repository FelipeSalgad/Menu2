import '../Estilos/Home.css';
import { Link } from "react-router-dom";
import img from "../json/img";

export default function Home() {
    return (
        <>
        <div className="home-section">
            <div className="section home-left">
                <div className="content">
                    <h2 className='content-h2'>
                        Explora con <img src= {img.logoBlanco} className="logo_home"/>
                    </h2>
                    <p className='content-p'>Los mejores restaurantes y platillos cerca de ti.</p>
                    <Link className="btn comida" to='/explorar'>¡Elige y disfruta!</Link>
                </div>
            </div>
            <div className="section home-right">
                <div className="content">
                    <h2 className='content-h2'>¿Tienes un restaurante?</h2>
                    <p className='content-p'>
                        ¡Únete a <img src= {img.logoBlanco} className="logo_home_r" /> y muestra tus platillos!
                    </p>
                    <Link className="btn unirse" to='/#'>Unirme</Link>
                </div>
            </div>
        </div>
        </>
    );
}
