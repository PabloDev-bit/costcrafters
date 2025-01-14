import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ComparisonChart } from "@/components/ComparisonChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Compare = () => {
  const { city1Id, city2Id } = useParams();

  // Mock data - in a real app this would come from an API
  const mockData = [
    {
      category: "Housing",
      city1Value: 2500,
      city2Value: 1800,
    },
    {
      category: "Food",
      city1Value: 400,
      city2Value: 350,
    },
    {
      category: "Transport",
      city1Value: 150,
      city2Value: 100,
    },
    {
      category: "Utilities",
      city1Value: 200,
      city2Value: 150,
    },
  ];

  // Mock city names - in a real app these would be fetched based on IDs
  const city1Name = "New York";
  const city2Name = "London";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
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

        <ComparisonChart
          data={mockData}
          city1Name={city1Name}
          city2Name={city2Name}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <p className="text-gray-600">
              Overall, {city1Name} is approximately 20% more expensive than{" "}
              {city2Name}. The biggest difference is in housing costs.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Housing is 38% more expensive in {city1Name}</li>
              <li>• Food costs are relatively similar</li>
              <li>• Transportation is 50% more expensive in {city1Name}</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Compare;