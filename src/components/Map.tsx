import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/citiesContext";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

const Map = () => {
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([
    24.0627, 82.6248,
  ]);
  const [lat, lng] = useUrlPosition();

  const { cities } = useCities();
  const {
    getPosition,
    isLoading: isLoadingGettingPos,
    position,
  } = useGeolocation();

  useEffect(() => {
    if (lat && lng) setMapPosition([+lat, +lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (position) setMapPosition([position.lat, position.lng]);
  }, [position]);

  return (
    <div className={styles.mapContainer}>
      {!position && (
        <Button type="position" onClick={getPosition}>
          {isLoadingGettingPos ? "Loading..." : "Use Your Position"}
        </Button>
      )}
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
        <DetectClick />
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

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });

  return null;
}

export default Map;
