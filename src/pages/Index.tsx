import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CitySelector } from "@/components/CitySelector";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface City {
  id: string;
  name: string;
  country: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [city1, setCity1] = useState<City | null>(null);
  const [city2, setCity2] = useState<City | null>(null);

  const handleCompare = () => {
    if (!city1 || !city2) {
      toast({
        title: "Please select two cities",
        description: "Both cities are required for comparison",
        variant: "destructive",
      });
      return;
    }
    navigate(`/compare/${city1.id}/${city2.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">City Cost Compare</h1>
          <p className="text-gray-600">
            Compare the cost of living between any two cities worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <CitySelector
              label="Select First City"
              onCitySelect={(city) => setCity1(city)}
            />
            {city1 && (
              <p className="text-sm text-primary">
                Selected: {city1.name}, {city1.country}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <CitySelector
              label="Select Second City"
              onCitySelect={(city) => setCity2(city)}
            />
            {city2 && (
              <p className="text-sm text-primary">
                Selected: {city2.name}, {city2.country}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleCompare}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-2 rounded-full"
          >
            Compare Cities
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;