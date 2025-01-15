import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Globe } from "lucide-react";
import { ComparisonChart } from "@/components/ComparisonChart";
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
  // city1Id, city2Id seront en fait des noms (ex. "Paris", "New York")
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

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700 dark:text-gray-300">{t("loading")}...</p>
      </div>
    );
  }

  // Si data manquante => Erreur
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

  // city1Name & city2Name => ex: "Paris", "New York"
  const city1Name = city1Data.cityName;
  const city2Name = city2Data.cityName;

  // Préparation du data pour BarChart
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

  // Ex pour summary => difference sur le logement
  const diffHousing = calculatePercentageDifference(
    city1Data.housing,
    city2Data.housing
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
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

        {/* Chart */}
        <div className="grid gap-6">
          <ComparisonChart
            data={chartData}
            city1Name={city1Name}
            city2Name={city2Name}
          />

          <div className="grid md:grid-cols-2 gap-6">
            {/* SUMMARY */}
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

            {/* INSIGHTS */}
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
      </div>
    </div>
  );
};

export default Compare;
