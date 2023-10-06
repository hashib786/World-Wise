import { CityI } from "../App";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";

type Props = {
  cities: CityI[];
  isLoading: boolean;
};

const CityList = ({ cities, isLoading }: Props) => {
  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};

export default CityList;
