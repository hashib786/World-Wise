// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import DatePicker from "react-date-picker";
import { CityI, useCities } from "../contexts/citiesContext";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState<Value>(new Date(Date.now()));
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isGeoFetching, setIsGeoFetching] = useState(false);
  const [error, setError] = useState("");
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!lat || !lng || !country || !date) return;
    const newCountry: CityI = {
      cityName,
      country,
      date: date?.toString(),
      emoji,
      notes,
      position: { lat: +lat, lng: +lng },
    };
    await createCity(newCountry);
    navigate("/app/cities");
  };

  useEffect(() => {
    (async () => {
      if (!lat && !lng) return;
      try {
        setIsGeoFetching(true);
        setError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(`Invalid country code Please click another location`);
        setCountry(data.countryName);
        setCityName(data.city || data.locality || "");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        error instanceof Error
          ? setError(error.message)
          : "Something went wrong when loading country data";
      } finally {
        setIsGeoFetching(false);
      }
    })();
  }, [lat, lng]);

  if (isGeoFetching) return <Spinner />;
  if (!lat || !lng)
    return <Message message="please add some city so click any where in app" />;
  if (error) return <Message message={error} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? "loading" : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker format="dd-MM-y" value={date} onChange={setDate} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={() => {}}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
