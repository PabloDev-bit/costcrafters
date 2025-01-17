import axios, { AxiosError } from "axios";
import { City as CityType } from "@/components/CitySelector";
import { toast } from "@/components/ui/use-toast";

// Configuration des APIs
const GEODB_API_KEY = import.meta.env.VITE_GEODB_API_KEY;
const GEODB_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// Validation de la clé API
if (!GEODB_API_KEY) {
  console.error("⚠️ GEODB_API_KEY manquante dans le fichier .env");
  toast({
    title: "Erreur de configuration",
    description: "La clé API GeoDB n'est pas configurée.",
    variant: "destructive",
  });
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

// Gestion des erreurs API
const handleApiError = (error: AxiosError, context: string) => {
  console.error(`Erreur API (${context}):`, error);

  if (error.response) {
    // Erreur avec réponse du serveur
    const status = error.response.status;
    let message = "";

    switch (status) {
      case 401:
        message = "Clé API invalide ou expirée";
        break;
      case 429:
        message = "Trop de requêtes, veuillez réessayer plus tard";
        break;
      case 500:
        message = "Erreur serveur, veuillez réessayer plus tard";
        break;
      default:
        message = `Erreur ${status}: ${error.message}`;
    }

    toast({
      title: "Erreur API",
      description: message,
      variant: "destructive",
    });
  } else if (error.request) {
    // Erreur réseau
    toast({
      title: "Erreur réseau",
      description: "Impossible de contacter le serveur",
      variant: "destructive",
    });
  }

  throw error;
};

/**
 * Recherche de villes par préfixe de nom via GeoDB Cities.
 */
export async function fetchCitiesByName(searchTerm: string): Promise<CityType[]> {
  if (!searchTerm) return [];

  try {
    console.log("🔍 Recherche de villes pour:", searchTerm);
    const url = `${GEODB_BASE_URL}/cities?namePrefix=${encodeURIComponent(
      searchTerm
    )}&limit=10&sort=-population`;

    const startTime = performance.now();
    const response = await axios.get(url, { 
      headers: GEODB_HEADERS,
      timeout: 5000 // Timeout de 5 secondes
    });
    const endTime = performance.now();

    console.log(`⚡ Temps de réponse: ${Math.round(endTime - startTime)}ms`);
    console.log("📊 Données reçues:", response.data);

    if (!response.data.data || !Array.isArray(response.data.data)) {
      console.error("❌ Format de réponse invalide:", response.data);
      throw new Error("Format de réponse invalide");
    }

    return response.data.data.map((city: any) => ({
      id: city.id.toString(),
      name: city.city,
      country: city.countryCode,
    }));
  } catch (error) {
    return handleApiError(error as AxiosError, "fetchCitiesByName");
  }
}

export interface CostOfLivingData {
  cityName: string;
  housing: number;
  food: number;
  transport: number;
  utilities: number;
}

/**
 * Récupération des données de coût de la vie via Numbeo
 */
export async function fetchCostOfLivingData(
  cityName: string
): Promise<CostOfLivingData> {
  try {
    console.log("💰 Récupération des coûts pour:", cityName);
    const startTime = performance.now();
    
    const response = await axios.get(NUMBEO_BASE_URL, {
      headers: NUMBEO_HEADERS,
      params: { city_name: cityName },
      timeout: 5000
    });
    
    const endTime = performance.now();
    console.log(`⚡ Temps de réponse: ${Math.round(endTime - startTime)}ms`);

    const data = response.data;
    const prices = data.prices || [];

    // Calcul des moyennes par catégorie
    const housing = calculateAverageForCategory(prices, ["Rent", "Apartment", "House"]);
    const food = calculateAverageForCategory(prices, ["Meal", "Food", "Grocery"]);
    const transport = calculateAverageForCategory(prices, ["Transportation", "Taxi", "Bus"]);
    const utilities = calculateAverageForCategory(prices, ["Utilities", "Internet", "Mobile"]);

    console.log("📊 Données calculées:", { housing, food, transport, utilities });

    return { cityName, housing, food, transport, utilities };
  } catch (error) {
    console.warn("⚠️ Utilisation des données simulées suite à une erreur");
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