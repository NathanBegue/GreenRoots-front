import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

export default function Map({ city }: { city: string }) {
  const [position, setPosition] = useState<[number, number]>([0, 0]); // Par défaut

  // Géocodage pour obtenir les coordonnées depuis la ville (plant_place)
  useEffect(() => {
    if (city) {
      const geocodeCity = async () => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.length > 0) {
            const { lat, lon } = data[0];
            setPosition([parseFloat(lat), parseFloat(lon)]);
          } else {
            console.warn(`Aucune coordonnée trouvée pour : ${city}`);
          }
        } catch (error) {
          console.error("Erreur lors du géocodage :", error);
        }
      };

      geocodeCity();
    }
  }, [city]);

  return (
    <div className="flex justify-center">
      <MapContainer center={position} zoom={5} style={{ height: "300px", width: "80%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            🌳 Arbre planté ici !<br />
            📍 Lieu : {city || "Non défini"}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
