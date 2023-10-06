import { CityI } from "../App";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";

type Props = {
  cities: CityI[];
  isLoading: boolean;
};

const CountryList = ({ cities, isLoading }: Props) => {
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Please add your firs city" />;

  const countries = cities.reduce((acc, curr) => {
    if (!acc.map((ele) => ele.country).includes(curr.country))
      return [...acc, { country: curr.country, emoji: curr.emoji }];
    else return acc;
  }, [] as { country: string; emoji: string }[]);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
};

export default CountryList;
