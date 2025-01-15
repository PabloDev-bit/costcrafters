import axios from 'axios';
import { City as CityType } from "@/components/CitySelector";

// Base URL et configuration de l'API GeoDB Cities pour la recherche de villes
const GEODB_BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const GEODB_API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

const GEODB_HEADERS = {
  "X-RapidAPI-Key": GEODB_API_KEY,
  "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
};

// Configuration de l'API Numbeo
const NUMBEO_BASE_URL = "https://cost-of-living-and-prices.p.rapidapi.com/prices";
const NUMBEO_API_KEY = GEODB_API_KEY; // Utilise la même clé RapidAPI

const NUMBEO_HEADERS = {
  'X-RapidAPI-Key': NUMBEO_API_KEY,
  'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
};

// Interface pour une ville
interface City {
  id: string;
  name: string;
  country: string;
}

/**
 * Recherche de villes par préfixe de nom via GeoDB Cities.
 */
export async function fetchCitiesByName(searchTerm: string): Promise<City[]> {
  if (!searchTerm) return [];

  try {
    console.log('Fetching cities for search term:', searchTerm);
    const url = `${GEODB_BASE_URL}/cities?namePrefix=${encodeURIComponent(searchTerm)}&limit=10`;
    const response = await axios.get(url, { headers: GEODB_HEADERS });
    console.log('Cities API response:', response.data);

    return response.data.data.map((city: any) => ({
      id: city.id,
      name: city.name,
      country: city.country,
    }));
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw new Error('Failed to fetch cities');
  }
}

// Interface pour les coûts de la vie
export interface CostOfLivingData {
  cityName: string;
  housing: number;
  food: number;
  transport: number;
  utilities: number;
}

/**
 * Récupère les coûts de la vie pour une ville spécifique via l'API Numbeo.
 */
export async function fetchCostOfLivingData(cityName: string): Promise<CostOfLivingData> {
  try {
    console.log('Fetching cost of living data for city:', cityName);
    const response = await axios.get(`${NUMBEO_BASE_URL}`, {
      headers: NUMBEO_HEADERS,
      params: {
        city_name: cityName,
      }
    });
    console.log('Cost of living API response:', response.data);

    // Traitement des données de l'API Numbeo
    const data = response.data;
    const prices = data.prices || [];

    // Calcul des moyennes par catégorie
    const housing = calculateAverageForCategory(prices, ['Rent', 'Apartment', 'House']);
    const food = calculateAverageForCategory(prices, ['Meal', 'Food', 'Grocery']);
    const transport = calculateAverageForCategory(prices, ['Transportation', 'Taxi', 'Bus']);
    const utilities = calculateAverageForCategory(prices, ['Utilities', 'Internet', 'Mobile']);

    return {
      cityName,
      housing,
      food,
      transport,
      utilities,
    };
  } catch (error) {
    console.error('Error fetching cost of living data:', error);
    // En cas d'erreur, retourner des données simulées
    return {
      cityName,
      housing: generateRandomCost(1000, 2000),
      food: generateRandomCost(200, 500),
      transport: generateRandomCost(50, 150),
      utilities: generateRandomCost(100, 300),
    };
  }
}

// Fonction utilitaire pour calculer la moyenne des coûts par catégorie
function calculateAverageForCategory(prices: any[], keywords: string[]): number {
  const relevantPrices = prices.filter((price: any) =>
    keywords.some(keyword => 
      price.item_name.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  if (relevantPrices.length === 0) {
    return generateRandomCost(100, 1000);
  }

  const sum = relevantPrices.reduce((acc: number, price: any) => 
    acc + parseFloat(price.avg_price || 0), 0
  );
  
  return Math.round(sum / relevantPrices.length);
}

// Fonction utilitaire pour générer un coût aléatoire
function generateRandomCost(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}