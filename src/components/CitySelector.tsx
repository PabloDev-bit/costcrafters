import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export interface City {
  id: string;
  name: string;
  country: string;
  flagUrl?: string;
}

interface CitySelectorProps {
  onCitySelect: (city: City) => void;
  label: string;
}

export const CitySelector = ({ onCitySelect, label }: CitySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");

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
      <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">
        {label}
      </label>

      <div className="relative transform transition-all duration-300 hover:scale-[1.02]">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
        <Input
          type="text"
          placeholder="Search cities..."
          className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 transition-all duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-2 animate-fade-in">
        {filteredCities.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No results found.
          </p>
        ) : (
          filteredCities.map((city) => (
            <Card
              key={city.id}
              className="p-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-primary/5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 group"
              onClick={() => onCitySelect(city)}
            >
              <div className="flex justify-start items-center gap-4">
                {city.flagUrl && (
                  <img
                    src={city.flagUrl}
                    alt={`${city.name} flag`}
                    className="w-6 h-6 object-contain rounded-sm shadow-sm"
                  />
                )}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
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