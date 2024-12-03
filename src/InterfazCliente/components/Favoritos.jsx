import "../Estilos/Favoritos.css";
import img from "../json/img";

const restaurantes = [
  {
    id_restaurante: "1",
    logo: img.Aida,
    tag: "Mexicano",
    nombre: "El Taco Loco",
    descripcion: "Deliciosos tacos al pastor",
    direccion: "Calle Principal 123",
    calificacion: "4.5",
    precio: "$$",
  },
  {
    id_restaurante: "2",
    logo: img.Aida,
    tag: "Italiano",
    nombre: "Pizza Bella",
    descripcion: "Auténtica pizza napolitana",
    direccion: "Avenida Italia 456",
    calificacion: "4.8",
    precio: "$$$",
  },
];

export default function Favoritos() {
  return (
    <div className="ultimas-ordenes">
      <h1>Porque los buenos lugares merecen ser recordados</h1>
      <h3>El proximo semestre el negro hace esto</h3>
    </div>
  );
}
