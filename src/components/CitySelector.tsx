import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast"; // Pour afficher des erreurs éventuelles
import { fetchCitiesByName } from "@/lib/api";

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
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length < 2) {
      setCities([]);
      return;
    }

    const searchCities = async () => {
      setIsLoading(true);
      try {
        const fetchedCities = await fetchCitiesByName(searchTerm);
        // Génère aussi une URL de drapeau (optionnel)
        const citiesWithFlags = fetchedCities.map((city) => ({
          ...city,
          flagUrl: `https://flagcdn.com/${city.country.toLowerCase()}.svg`,
        }));
        setCities(citiesWithFlags);
      } catch (error: any) {
        toast({
          title: "Error fetching cities",
          description: error?.message || "Unknown error",
          variant: "destructive",
        });
        setCities([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Légère temporisation pour éviter de surcharger l’API
    const debounceTimer = setTimeout(() => {
      searchCities();
    }, 350);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return (
    <div className="w-full space-y-4">
      <label className="block text-lg font-semibold text-gray-700 dark:text-gray-200">
        {label}
      </label>

      <div className="relative transition-all duration-300 hover:scale-[1.02]">
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
        {isLoading ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            Loading...
          </p>
        ) : cities.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            {searchTerm.length < 2
              ? "Enter at least 2 characters"
              : "No results found."}
          </p>
        ) : (
          cities.map((city) => (
            <Card
              key={city.id}
              className="p-4 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-primary/5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 group"
              onClick={() => onCitySelect(city)}
            >
              <div className="flex items-center gap-4">
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
