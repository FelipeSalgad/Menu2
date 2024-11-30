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
import { AuthProvider } from "./InterfazCliente/context/authContext";
import { ClienteProvider } from "./InterfazCliente/context/ClienteContext";

function App() {
  return (
    <AuthProvider>
      <ClienteProvider>
        <NavBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/restaurante" element={<Restaurante />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/favoritos" element={<Favoritos />} />
        </Routes>
        <Footer />
      </ClienteProvider>
    </AuthProvider>
  );
}

export default App;
