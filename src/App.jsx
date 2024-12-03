import { Route, Routes } from "react-router-dom";
import "./App.css";
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
import LoginRestaurante from "./InterfazRestaurante/Pages/LoginRestaurante"
import RegisterRestaurante from "./InterfazRestaurante/Pages/ResgisterRestaurante";
import HomeRestaurante from "./InterfazRestaurante/Pages/HomeRestaurante";

import { AuthProvider } from "./InterfazCliente/context/authContext";
import { ClienteProvider } from "./InterfazCliente/context/ClienteContext";
import { CarritoProvider } from "./InterfazCliente/context/CarritoContext";

function App() {
  return (
    <AuthProvider>
      <ClienteProvider>
      <CarritoProvider>
        <NavBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/restaurante/:id" element={<Restaurante />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/socio" element={<LoginRestaurante />} />
          <Route path="/socioRegis" element={<RegisterRestaurante />} />
          <Route path="/homeSocio" element={<HomeRestaurante />} />
        </Routes>
        <Footer />
        </CarritoProvider>
      </ClienteProvider>
    </AuthProvider>
  );
}

export default App;
