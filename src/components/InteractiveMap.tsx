import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

interface City {
  name: string;
  country: string;
  coordinates?: [number, number]; // devenu optionnel
}

interface InteractiveMapProps {
  cities: City[];
  onCityClick: (city: City) => void;
}

// Petit dictionnaire de coordonnées. Peut être complété ou remplacé par des requêtes.
const cityCoordinates: { [key: string]: [number, number] } = {
  "Paris": [2.3522, 48.8566],
  "London": [-0.1278, 51.5074],
  "New York": [-74.0060, 40.7128],
  "Tokyo": [139.6503, 35.6762],
  "Moscow": [37.6173, 55.7558],
  "Rdzawka": [19.9449, 49.6197],
};

const InteractiveMap = ({ cities, onCityClick }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with the provided token
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGFibGl0bzM1NTQwIiwiYSI6ImNtNGRkcm5pNjBrbTkycG9uaWFybTFhMzMifQ.G92iGrmTul-F96VMmdrQAw";

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      projection: "globe",
      zoom: 1.5,
      center: [30, 15],
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      "top-right"
    );

    // Add markers for each city
    cities.forEach((city) => {
      // On tente de choper les coords depuis city.coordinates
      // Sinon on va les chercher dans cityCoordinates
      let coords: [number, number] = [0, 0];
      if (city.coordinates) {
        coords = city.coordinates;
      } else if (cityCoordinates[city.name]) {
        coords = cityCoordinates[city.name];
      }

      const marker = new mapboxgl.Marker({
        element: createCustomMarker(city.name),
      })
        .setLngLat(coords)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3 class="font-bold">${city.name}</h3><p>${city.country}</p>`
          )
        )
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [cities]);

  const createCustomMarker = (cityName: string) => {
    const el = document.createElement("div");
    el.className = "custom-marker";
    // On injecte un petit SVG ou icône via innerHTML
    el.innerHTML = `<div class="bg-primary p-2 rounded-full text-white hover:bg-primary/80 transition-colors">
      ${MapPin}
    </div>`;
    el.addEventListener("click", () => {
      const city = cities.find((c) => c.name === cityName);
      if (city) {
        onCityClick(city);
      }
    });
    return el;
  };

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default InteractiveMap;
