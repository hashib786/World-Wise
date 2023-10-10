import { useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/citiesContext";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";

const Map = () => {
  // const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([
    24.0627, 82.6248,
  ]);
  const [searchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  const { cities } = useCities();

  useEffect(() => {
    console.log(lat, lng);
    if (lat && lng) setMapPosition([+lat, +lng]);
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeMapPosition position={mapPosition} />
      </MapContainer>
    </div>
  );
};

function ChangeMapPosition({ position }: { position: LatLngExpression }) {
  const map = useMap();
  if (map) {
    map.setView(position); // Set the view if the map instance exists
  }

  return null;
}

export default Map;
