import { Route, Routes } from "react-router-dom";
import './App.css'
import NotFound from "./InterfazCliente/Pages/NotFound";
import Home from "./InterfazCliente/Pages/Home";
import Login from "./InterfazCliente/Pages/Login";
import Register from "./InterfazCliente/Pages/Register";
import Footer from "./InterfazCliente/components/Footer";
import Explorar from "./InterfazCliente/Restaurante/Explorar";
import NavBar from "./InterfazCliente/components/NavBar";
import Restaurante from "./InterfazCliente/Restaurante/Restaurante";
import Perfil from "./InterfazCliente/Restaurante/Perfil";
import Favoritos from "./InterfazCliente/components/Favoritos";

function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="*"
        element={<NotFound />}>
      </Route>
      <Route path="/"
        element={<Home />}>
      </Route>
      <Route path="/login"
        element={<Login />}>
      </Route>
      <Route path="/register"
        element={<Register />}>
      </Route>
      <Route path="/explorar"
        element={<Explorar />}>
      </Route>
      <Route path="/restaurante"
        element={<Restaurante />}>
      </Route> 
      <Route path="/perfil"
        element={<Perfil />}>
      </Route>
      <Route path="/favoritos"
        element={<Favoritos />}>
      </Route>
    </Routes>
    <Footer />
    </>
  )
}

export default App
