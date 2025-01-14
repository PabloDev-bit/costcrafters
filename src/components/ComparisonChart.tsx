import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ComparisonChartProps {
  data: {
    category: string;
    city1Value: number;
    city2Value: number;
  }[];
  city1Name: string;
  city2Name: string;
}

export const ComparisonChart = ({
  data,
  city1Name,
  city2Name,
}: ComparisonChartProps) => {
  return (
    <Card className="p-6 w-full h-[400px]">
      <h3 className="text-lg font-semibold mb-4">Cost Comparison</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="city1Value" name={city1Name} fill="#5B21B6" />
          <Bar dataKey="city2Value" name={city2Name} fill="#0D9488" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};