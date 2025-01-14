import { useParams, Link } from "react-router-dom";
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

const Compare = () => {
  const { city1Id, city2Id } = useParams();
  const { t, language, setLanguage } = useLanguage();

  // Mock data - in a real app this would come from an API
  const mockData = [
    {
      category: t("housing"),
      city1Value: 2500,
      city2Value: 1800,
    },
    {
      category: t("food"),
      city1Value: 400,
      city2Value: 350,
    },
    {
      category: t("transport"),
      city1Value: 150,
      city2Value: 100,
    },
    {
      category: t("utilities"),
      city1Value: 200,
      city2Value: 150,
    },
  ];

  // Mock city names - in a real app these would be fetched based on IDs
  const city1Name = "Paris";
  const city2Name = "Tokyo";

  const calculatePercentageDifference = (value1: number, value2: number) => {
    return Math.round(((value1 - value2) / value2) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              {city1Name} vs {city2Name}
            </h1>
          </div>
          <Select value={language} onValueChange={(value) => setLanguage(value as 'fr' | 'en')}>
            <SelectTrigger className="w-[180px]">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t("switchLanguage")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ComparisonChart
          data={mockData}
          city1Name={city1Name}
          city2Name={city2Name}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t("summary")}</h2>
            <p className="text-gray-600">
              {city1Name} {t(calculatePercentageDifference(2500, 1800) > 0 ? "moreExpensive" : "lessExpensive")} {city2Name}
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">{t("insights")}</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• {t("housingInsight")} {calculatePercentageDifference(2500, 1800)}% {t(calculatePercentageDifference(2500, 1800) > 0 ? "moreExpensive" : "lessExpensive")} {city2Name}</li>
              <li>• {t("foodInsight")} {calculatePercentageDifference(400, 350)}% {t(calculatePercentageDifference(400, 350) > 0 ? "moreExpensive" : "lessExpensive")} {city2Name}</li>
              <li>• {t("transportInsight")} {calculatePercentageDifference(150, 100)}% {t(calculatePercentageDifference(150, 100) > 0 ? "moreExpensive" : "lessExpensive")} {city2Name}</li>
              <li>• {t("utilitiesInsight")} {calculatePercentageDifference(200, 150)}% {t(calculatePercentageDifference(200, 150) > 0 ? "moreExpensive" : "lessExpensive")} {city2Name}</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Compare;