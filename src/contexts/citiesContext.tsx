import { ReactNode, createContext, useEffect, useState } from "react";

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

export const CitiesContext = createContext<CityContextType | null>(null);

export const CitiesProvider = ({ children }: { children: ReactNode }) => {
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
