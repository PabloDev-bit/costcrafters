// src/lib/api.ts
import { City as CityType } from "@/components/CitySelector";

// Base URL et configuration de l'API GeoDB Cities
const BASE_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

const HEADERS = {
  "X-RapidAPI-Key": API_KEY,
  "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
};

// Interface pour une ville
interface City {
  id: string;
  name: string;
  country: string;
}

/**
 * Recherche de villes par préfixe de nom via GeoDB Cities.
 * @param searchTerm Le terme de recherche pour filtrer les villes.
 * @returns Une liste de villes correspondantes.
 */
export async function fetchCitiesByName(searchTerm: string): Promise<City[]> {
  if (!searchTerm) return [];

  // URL pour rechercher les villes par préfixe
  const url = `${BASE_URL}/cities?namePrefix=${encodeURIComponent(searchTerm)}&limit=10`;

  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    throw new Error(`Erreur lors de la récupération des villes : ${res.status}`);
  }

  const data = await res.json();
  return data.data.map((city: any) => ({
    id: city.id,
    name: city.name,
    country: city.country,
  }));
}

// Interface pour les coûts de la vie
interface CostOfLivingData {
  cityName: string;
  housing: number;
  food: number;
  transport: number;
  utilities: number;
}

/**
 * Récupère les coûts de la vie pour une ville spécifique.
 * (Remplacez l'URL si vous utilisez une autre API pour les coûts de la vie)
 * @param cityName Nom de la ville.
 * @returns Les données de coût de la vie.
 */
export async function fetchCostOfLivingData(cityName: string): Promise<CostOfLivingData> {
  const BASE_COST_URL = "https://votre-api-cost.com";
  const url = `${BASE_COST_URL}/cost-of-living?city=${encodeURIComponent(cityName)}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Erreur lors de la récupération des coûts : ${res.status}`);
  }

  const data = await res.json();
  return {
    cityName: data.cityName,
    housing: data.housing || 0,
    food: data.food || 0,
    transport: data.transport || 0,
    utilities: data.utilities || 0,
  };
}
