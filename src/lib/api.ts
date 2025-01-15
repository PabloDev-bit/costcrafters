import axios from "axios";
import { City as CityType } from "@/components/CitySelector";

// Lis la clé d’API depuis la config Vite
const GEODB_API_KEY = import.meta.env.VITE_GEODB_API_KEY || "";
const GEODB_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// On vérifie au cas où
if (!GEODB_API_KEY) {
  console.warn(
    "⚠️  GEODB_API_KEY is missing. Make sure you have set it in your .env file."
  );
}

// Headers pour GeoDB Cities
const GEODB_HEADERS = {
  "X-RapidAPI-Key": GEODB_API_KEY,
  "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
};

// Configuration de l'API Numbeo
const NUMBEO_BASE_URL = "https://cost-of-living-and-prices.p.rapidapi.com/prices";
const NUMBEO_HEADERS = {
  "X-RapidAPI-Key": GEODB_API_KEY,
  "X-RapidAPI-Host": "cost-of-living-and-prices.p.rapidapi.com",
};

export async function fetchCitiesByName(searchTerm: string): Promise<CityType[]> {
  if (!searchTerm) return [];

  try {
    const url = `${GEODB_BASE_URL}/cities?namePrefix=${encodeURIComponent(
      searchTerm
    )}&limit=10&sort=-population`;

    const response = await axios.get(url, { headers: GEODB_HEADERS });
    return response.data.data.map((city: any) => ({
      id: city.id.toString(),
      name: city.city,
      country: city.countryCode,
    }));
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw new Error("Failed to fetch cities");
  }
}

export interface CostOfLivingData {
  cityName: string;
  housing: number;
  food: number;
  transport: number;
  utilities: number;
}

export async function fetchCostOfLivingData(cityName: string): Promise<CostOfLivingData> {
  try {
    const response = await axios.get(NUMBEO_BASE_URL, {
      headers: NUMBEO_HEADERS,
      params: { city_name: cityName },
    });

    const data = response.data;
    const prices = data.prices || [];

    // Calcul des moyennes par catégorie
    const housing = calculateAverageForCategory(prices, ["Rent", "Apartment", "House"]);
    const food = calculateAverageForCategory(prices, ["Meal", "Food", "Grocery"]);
    const transport = calculateAverageForCategory(prices, ["Transportation", "Taxi", "Bus"]);
    const utilities = calculateAverageForCategory(prices, ["Utilities", "Internet", "Mobile"]);

    return { cityName, housing, food, transport, utilities };
  } catch (error) {
    // On log l’erreur et on fournit des données simulées
    console.error("Error fetching cost of living data:", error);
    return {
      cityName,
      housing: generateRandomCost(1000, 2000),
      food: generateRandomCost(200, 500),
      transport: generateRandomCost(50, 150),
      utilities: generateRandomCost(100, 300),
    };
  }
}

function calculateAverageForCategory(prices: any[], keywords: string[]): number {
  const relevantPrices = prices.filter((price: any) =>
    keywords.some((keyword) =>
      price.item_name?.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  if (relevantPrices.length === 0) {
    return generateRandomCost(100, 1000);
  }

  const sum = relevantPrices.reduce(
    (acc: number, price: any) => acc + parseFloat(price.avg_price || 0),
    0
  );
  return Math.round(sum / relevantPrices.length);
}

function generateRandomCost(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}
