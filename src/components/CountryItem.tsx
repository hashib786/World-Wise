import styles from "./CountryItem.module.css";

type Props = {
  country: {
    emoji: string;
    country: string;
  };
};

function CountryItem({ country: { country, emoji } }: Props) {
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

export default CountryItem;
