import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

const Map = () => {
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Hello Hashib How are you ?</h1>
      <h2>
        Position : {lat} : {lng}
      </h2>
      <button
        className="btn"
        onClick={() => setSearchParam({ lat: "23", lng: "20" })}
      >
        Change Url
      </button>
    </div>
  );
};

export default Map;
