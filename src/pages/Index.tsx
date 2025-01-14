import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CitySelector } from "@/components/CitySelector";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Moon, Sun, Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "@/contexts/ThemeContext";

interface City {
  id: string;
  name: string;
  country: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [city1, setCity1] = useState<City | null>(null);
  const [city2, setCity2] = useState<City | null>(null);
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleCompare = () => {
    if (!city1 || !city2) {
      toast({
        title: t("selectCitiesError"),
        description: t("selectCitiesErrorDesc"),
        variant: "destructive",
      });
      return;
    }
    navigate(`/compare/${city1.id}/${city2.id}`);
  };

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 
      'bg-gradient-to-br from-purple-50 to-teal-50'
    }`}>
      <div className="max-w-4xl mx-auto p-4 space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {t("appTitle")}
          </h1>
          <div className="flex items-center gap-4">
            <Select value={language} onValueChange={(value) => setLanguage(value as 'fr' | 'en')}>
              <SelectTrigger className="w-[140px]">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t("selectLanguage")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 bg-card p-6 rounded-xl shadow-lg animate-slide-up">
            <CitySelector
              label={t("selectFirstCity")}
              onCitySelect={(city) => setCity1(city)}
            />
            {city1 && (
              <p className="text-sm text-primary font-medium">
                {t("selected")}: {city1.name}, {city1.country}
              </p>
            )}
          </div>

          <div className="space-y-4 bg-card p-6 rounded-xl shadow-lg animate-slide-up delay-100">
            <CitySelector
              label={t("selectSecondCity")}
              onCitySelect={(city) => setCity2(city)}
            />
            {city2 && (
              <p className="text-sm text-primary font-medium">
                {t("selected")}: {city2.name}, {city2.country}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleCompare}
            className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            {t("compareCities")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;