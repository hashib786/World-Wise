import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const BASE_URL = `http://localhost:8000`;

export interface CityI {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
}

export type CityContextType = {
  cities: CityI[];
  isLoading: boolean;
};

const CitiesContext = createContext<CityContextType | null>(null);

const CitiesProvider = ({ children }: { children: ReactNode }) => {
  const [cities, setCities] = useState<CityI[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
      {children};
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const value = useContext(CitiesContext);
  if (value === undefined)
    throw new Error("Cities Provider is not Provider this component");
  if (!value) return { cities: [], isLoading: false };
  return value;
};

export default CitiesContext;
// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities, BASE_URL };
