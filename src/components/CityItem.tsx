import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { CityI, useCities } from "../contexts/citiesContext";

type Props = {
  city: CityI;
};

// eslint-disable-next-line react-refresh/only-export-components
export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem = ({ city }: Props) => {
  const { currentCity } = useCities();
  const {
    emoji,
    cityName,
    date,
    id,
    position: { lat, lng },
  } = city;

  return (
    <li>
      <Link
        to={`${id}?lat=${lat}&lng=${lng}`}
        className={`${styles.cityItem} 
      ${currentCity?.id === id ? styles["cityItem--active"] : ""}
      `}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;
