import { Route, Routes } from "react-router-dom";
import './App.css'
import NotFound from "./Pages/NotFound"
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Explorar from "./Restaurante/Explorar";
import NavBar from "./components/NavBar";
import Restaurante from "./Restaurante/Restaurante";

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
    </Routes>
    <Footer />
    </>
  )
}

export default App
