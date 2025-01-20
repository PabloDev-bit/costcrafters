import React from 'react';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface SimilarCity {
  name: string;
  country: string;
  similarityScore: number;
  costOfLiving: number;
}

interface SimilarCitiesProps {
  cities: SimilarCity[];
  onCitySelect: (city: SimilarCity) => void;
}

const SimilarCities = ({ cities, onCitySelect }: SimilarCitiesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cities.map((city) => (
        <Card
          key={city.name}
          className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onCitySelect(city)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{city.name}</h3>
              <p className="text-sm text-muted-foreground">{city.country}</p>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mt-2">
            <p className="text-sm">
              Similarité: {city.similarityScore}%
            </p>
            <p className="text-sm">
              Coût de la vie: {city.costOfLiving}% de la référence
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SimilarCities;