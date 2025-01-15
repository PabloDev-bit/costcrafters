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
    // Au lieu de city1.id / city2.id, on passe city1.name / city2.name
    navigate(`/compare/${encodeURIComponent(city1.name)}/${encodeURIComponent(city2.name)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-fade-in">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            {t("appTitle")}
          </h1>
          <div className="flex items-center gap-4">
            <Select
              value={language}
              onValueChange={(value) => setLanguage(value as "fr" | "en")}
            >
              <SelectTrigger className="w-[140px] bg-white/80 dark:bg-gray-800/80">
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
              className="rounded-full bg-white/80 dark:bg-gray-800/80 hover:shadow-lg transition-all duration-300"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </header>

        {/* City Selection */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg animate-slide-up">
            <CitySelector
              label={t("selectFirstCity")}
              onCitySelect={(city) => setCity1(city)}
            />
            {city1 && (
              <p className="text-sm font-medium text-primary dark:text-primary-foreground">
                {t("selected")}: {city1.name}, {city1.country}
              </p>
            )}
          </div>

          <div className="space-y-4 backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg animate-slide-up delay-100">
            <CitySelector
              label={t("selectSecondCity")}
              onCitySelect={(city) => setCity2(city)}
            />
            {city2 && (
              <p className="text-sm font-medium text-primary dark:text-primary-foreground">
                {t("selected")}: {city2.name}, {city2.country}
              </p>
            )}
          </div>
        </div>

        {/* Compare Button */}
        <div className="flex justify-center pt-8">
          <Button
            onClick={handleCompare}
            className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            {t("compareCities")}
          </Button>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 Cost of Living Comparison. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
