import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Globe, ExternalLink } from "lucide-react";
import { ComparisonChart } from "@/components/ComparisonChart";
import InteractiveMap from "@/components/InteractiveMap";
import SimilarCities from "@/components/SimilarCities";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCostOfLivingData, CostOfLivingData } from "@/lib/api";

const Compare = () => {
  const { city1Id, city2Id } = useParams();
  const { t, language, setLanguage } = useLanguage();

  const [city1Data, setCity1Data] = useState<CostOfLivingData | null>(null);
  const [city2Data, setCity2Data] = useState<CostOfLivingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculatePercentageDifference = (value1: number, value2: number) => {
    return Math.round(((value1 - value2) / value2) * 100);
  };

  useEffect(() => {
    if (!city1Id || !city2Id) return;

    setIsLoading(true);

    Promise.all([
      fetchCostOfLivingData(city1Id),
      fetchCostOfLivingData(city2Id),
    ])
      .then(([data1, data2]) => {
        setCity1Data(data1);
        setCity2Data(data2);
      })
      .catch((error) => {
        console.error("Error fetching cost of living data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [city1Id, city2Id]);

  const [selectedCities, setSelectedCities] = useState<{
    coordinates: [number, number][];
    names: string[];
  }>({
    coordinates: [],
    names: [],
  });

  const similarCities = [
    {
      name: "Ville Similaire 1",
      country: "Pays 1",
      similarityScore: 85,
      costOfLiving: 95,
    },
    {
      name: "Ville Similaire 2",
      country: "Pays 2",
      similarityScore: 80,
      costOfLiving: 90,
    },
  ];

  const externalResources = [
    {
      title: "Guide de voyage pour Paris",
      url: "https://example.com/paris-guide",
    },
    {
      title: "Blog sur le coût de la vie à Londres",
      url: "https://example.com/london-cost",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">{t("loading")}...</p>
      </div>
    );
  }

  if (!city1Data || !city2Data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          {t("errorFetchingData")}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">{t("tryAgain")}</p>

        <Link to="/">
          <Button variant="outline" className="mt-4">
            {t("compareCities")}
          </Button>
        </Link>
      </div>
    );
  }

  const city1Name = city1Data.cityName;
  const city2Name = city2Data.cityName;

  const chartData = [
    {
      category: t("housing"),
      city1Value: city1Data.housing,
      city2Value: city2Data.housing,
    },
    {
      category: t("food"),
      city1Value: city1Data.food,
      city2Value: city2Data.food,
    },
    {
      category: t("transport"),
      city1Value: city1Data.transport,
      city2Value: city2Data.transport,
    },
    {
      category: t("utilities"),
      city1Value: city1Data.utilities,
      city2Value: city2Data.utilities,
    },
  ];

  const diffHousing = calculatePercentageDifference(
    city1Data.housing,
    city2Data.housing
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        <div className="flex items-center justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              <span className="text-primary hover:text-primary/80 dark:text-gray-200 dark:hover:text-purple-300 transition-colors">
                {city1Name}
              </span>
              {" vs "}
              <span className="text-secondary hover:text-secondary/80 dark:text-gray-200 dark:hover:text-teal-300 transition-colors">
                {city2Name}
              </span>
            </h1>
          </div>
          <Select value={language} onValueChange={(val) => setLanguage(val as "fr" | "en")}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-700">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t("switchLanguage")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Carte Interactive</h2>
          <InteractiveMap
            cities={[
              {
                name: city1Name,
                country: "Country 1",
                coordinates: [2.3522, 48.8566],
              },
              {
                name: city2Name,
                country: "Country 2",
                coordinates: [-0.1276, 51.5074],
              },
            ]}
            onCityClick={(city) => console.log("Ville sélectionnée:", city)}
          />
        </Card>

        <div className="grid gap-6">
          <ComparisonChart
            data={chartData}
            city1Name={city1Name}
            city2Name={city2Name}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                {t("summary")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {`${city1Name} ${
                  t(diffHousing > 0 ? "moreExpensive" : "lessExpensive")
                } ${city2Name} ${Math.abs(diffHousing)}%`}
              </p>
            </Card>

            <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                {t("insights")}
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="inline-block w-2 h-2 mt-2 rounded-full bg-primary"></span>
                  <span className="leading-relaxed">
                    {t("housingInsight")} {Math.abs(diffHousing)}%{" "}
                    {t(diffHousing > 0 ? "moreExpensive" : "lessExpensive")} {city2Name}
                  </span>
                </li>
                {/* Idem pour 'foodInsight', 'transportInsight', 'utilitiesInsight' */}
              </ul>
            </Card>
          </div>
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Villes Similaires</h2>
          <SimilarCities
            cities={similarCities}
            onCitySelect={(city) => console.log("Ville similaire sélectionnée:", city)}
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Ressources Externes</h2>
          <div className="grid gap-4">
            {externalResources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                {resource.title}
              </a>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Questions Fréquentes</h2>
          <FAQ />
        </Card>
      </div>
    </div>
  );
};

export default Compare;
