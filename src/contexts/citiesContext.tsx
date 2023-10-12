import {
  ReactNode,
  createContext,
  useCallback,
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
  id?: number;
}

export type CityContextType = {
  cities: CityI[];
  isLoading: boolean;
  currentCity: CityI | null;
  getCity: (id: number) => void;
  createCity: (newCity: CityI) => Promise<void>;
  deleteCity: (id: number) => Promise<void>;
};

const CitiesContext = createContext<CityContextType>({
  cities: [],
  isLoading: false,
  currentCity: null,
  getCity: function (): void {
    throw new Error("Function not implemented.");
  },
  createCity: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  deleteCity: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
});

const CitiesProvider = ({ children }: { children: ReactNode }) => {
  const [cities, setCities] = useState<CityI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<CityI | null>(null);

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

  const getCity = useCallback(
    async function getCity(id: number) {
      if (id === currentCity?.id) return;
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setCurrentCity(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [currentCity?.id]
  );

  async function createCity(newCity: CityI) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      setCities((prev) => [...prev, data]);
      setCurrentCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id: number) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((prev) => prev.filter((ele) => ele.id !== id));
      setCurrentCity(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children};
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const value = useContext(CitiesContext);
  if (value === undefined)
    throw new Error("Cities Provider is not Provider this component");
  return value;
};

export default CitiesContext;
// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities, BASE_URL };
