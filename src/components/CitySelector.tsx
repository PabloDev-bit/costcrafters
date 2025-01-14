import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface City {
  id: string;
  name: string;
  country: string;
  flagUrl?: string; // Nouveau champ
}

interface CitySelectorProps {
  onCitySelect: (city: City) => void;
  label: string;
}

export const CitySelector = ({ onCitySelect, label }: CitySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Exemple amélioré de data avec URL de drapeau (ou n’importe quelle image)
  const cities: City[] = [
    {
      id: "1",
      name: "New York",
      country: "USA",
      flagUrl: "https://flagcdn.com/us.svg",
    },
    {
      id: "2",
      name: "London",
      country: "UK",
      flagUrl: "https://flagcdn.com/gb.svg",
    },
    {
      id: "3",
      name: "Paris",
      country: "France",
      flagUrl: "https://flagcdn.com/fr.svg",
    },
    {
      id: "4",
      name: "Tokyo",
      country: "Japan",
      flagUrl: "https://flagcdn.com/jp.svg",
    },
    {
      id: "5",
      name: "Sydney",
      country: "Australia",
      flagUrl: "https://flagcdn.com/au.svg",
    },
  ];

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      {/* Zone de recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search cities..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Liste de résultats */}
      <div className="space-y-2">
        {filteredCities.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No results found.
          </p>
        ) : (
          filteredCities.map((city) => (
            <Card
              key={city.id}
              className="p-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:hover:bg-gray-800 group"
              onClick={() => onCitySelect(city)}
            >
              <div className="flex justify-start items-center gap-4">
                {/* Ajout d’une image (drapeau) */}
                {city.flagUrl && (
                  <img
                    src={city.flagUrl}
                    alt={`${city.name} flag`}
                    className="w-6 h-6 object-contain"
                  />
                )}
                <div>
                  <h3 className="font-medium group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                    {city.country}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
