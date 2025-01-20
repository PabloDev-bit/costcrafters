import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

interface City {
  name: string;
  country: string;
  coordinates: [number, number];
}

interface InteractiveMapProps {
  cities: City[];
  onCityClick: (city: City) => void;
}

const InteractiveMap = ({ cities, onCityClick }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with the provided token
    mapboxgl.accessToken = 'pk.eyJ1IjoicGFibGl0bzM1NTQwIiwiYSI6ImNtNGRkcm5pNjBrbTkycG9uaWFybTFhMzMifQ.G92iGrmTul-F96VMmdrQAw';
    
    console.log('Initializing Mapbox map...');

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      zoom: 1.5,
      center: [30, 15],
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    console.log('Adding markers for cities:', cities);

    // Add markers for each city
    cities.forEach((city) => {
      const marker = new mapboxgl.Marker({
        element: createCustomMarker(city.name),
      })
        .setLngLat(city.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3 class="font-bold">${city.name}</h3><p>${city.country}</p>`
          )
        )
        .addTo(map.current!);
    });

    return () => {
      console.log('Cleaning up Mapbox map...');
      map.current?.remove();
    };
  }, [cities]);

  const createCustomMarker = (cityName: string) => {
    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.innerHTML = `<div class="bg-primary p-2 rounded-full text-white hover:bg-primary/80 transition-colors">
      ${MapPin}
    </div>`;
    el.addEventListener('click', () => {
      const city = cities.find(c => c.name === cityName);
      if (city) {
        console.log('City marker clicked:', city);
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