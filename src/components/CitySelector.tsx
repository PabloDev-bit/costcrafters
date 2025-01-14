import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface City {
  id: string;
  name: string;
  country: string;
}

interface CitySelectorProps {
  onCitySelect: (city: City) => void;
  label: string;
}

export const CitySelector = ({ onCitySelect, label }: CitySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock cities data - in a real app this would come from an API
  const cities: City[] = [
    { id: "1", name: "New York", country: "USA" },
    { id: "2", name: "London", country: "UK" },
    { id: "3", name: "Paris", country: "France" },
    { id: "4", name: "Tokyo", country: "Japan" },
    { id: "5", name: "Sydney", country: "Australia" },
  ];

  const filteredCities = cities.filter(
    city => city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
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
      <div className="space-y-2">
        {filteredCities.map((city) => (
          <Card
            key={city.id}
            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => onCitySelect(city)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{city.name}</h3>
                <p className="text-sm text-gray-500">{city.country}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};