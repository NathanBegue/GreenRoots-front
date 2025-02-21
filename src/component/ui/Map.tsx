import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const position: [number, number] = [-3.465305, -62.215881]; // Coordonnées de Paris

  return (
    <div className="flex justify-center ">

      <MapContainer center={position} zoom={3} style={{ height: "300px", width: "80%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>Arbre planté ici !</Popup>
        </Marker>
      </MapContainer>

    </div>
  );
};


