// import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/citiesContext";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = () => {
  // const navigate = useNavigate();
  // const [searchParam, setSearchParam] = useSearchParams();
  // const lat = searchParam.get("lat");
  // const lng = searchParam.get("lng");
  const { cities } = useCities();

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={[51.505, -0.09]}
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
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
