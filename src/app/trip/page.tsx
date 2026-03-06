"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TripHeader from "./components/TripHeader";
import TripNav from "./components/TripNav";
import FlightsSection from "./components/FlightsSection";
import HotelsSection from "./components/HotelsSection";
import PointsOfInterestSection from "./components/PointsOfInterestSection";
import RestaurantsSection from "./components/RestaurantsSection";
import ItinerarySection from "./components/ItinerarySection";
import type { ItineraryItem, TripItinerary } from "./types";

export type TripSection = "vuelos" | "hospedaje" | "puntos" | "restaurantes" | "itinerario";

function TripPageContent() {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState<TripSection>("vuelos");

  const destination = {
    name: searchParams.get("name") ?? "Destino",
    country: searchParams.get("country") ?? "",
    lat: parseFloat(searchParams.get("lat") ?? "0"),
    lng: parseFloat(searchParams.get("lng") ?? "0"),
    photoUrl: searchParams.get("photoUrl") ?? null,
  };

  const storageKey = `itinerary-${destination.lat}-${destination.lng}`;

  const [itinerary, setItinerary] = useState<TripItinerary>({ days: [] });

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setItinerary(JSON.parse(stored));
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(itinerary));
  }, [itinerary, storageKey]);

  function addToItinerary(item: ItineraryItem, dayNumber: number) {
    setItinerary((prev) => {
      const days = prev.days.map((d) => ({ ...d, items: [...d.items] }));
      const existing = days.find((d) => d.dayNumber === dayNumber);
      if (existing) {
        if (existing.items.some((i) => i.id === item.id)) return prev;
        existing.items.push(item);
      } else {
        days.push({ dayNumber, items: [item] });
        days.sort((a, b) => a.dayNumber - b.dayNumber);
      }
      return { days };
    });
  }

  function removeFromItinerary(itemId: string, dayNumber: number) {
    setItinerary((prev) => ({
      days: prev.days
        .map((d) =>
          d.dayNumber === dayNumber
            ? { ...d, items: d.items.filter((i) => i.id !== itemId) }
            : d
        )
        .filter((d) => d.items.length > 0),
    }));
  }

  const sectionComponents: Record<TripSection, React.ReactNode> = {
    vuelos: <FlightsSection destination={destination} />,
    hospedaje: <HotelsSection destination={destination} />,
    puntos: <PointsOfInterestSection destination={destination} onAddToItinerary={addToItinerary} />,
    restaurantes: <RestaurantsSection destination={destination} onAddToItinerary={addToItinerary} />,
    itinerario: <ItinerarySection itinerary={itinerary} onRemove={removeFromItinerary} />,
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TripHeader />

      {/* Secondary nav */}
      <TripNav active={activeSection} onChange={setActiveSection} />

      {/* Destination hero */}
      <div className="max-w-6xl mx-auto w-full px-4 pt-6">
        <div className="relative h-100 w-full overflow-hidden rounded-2xl bg-gray-800 shadow-md">
          {destination.photoUrl ? (
            <img
              src={destination.photoUrl}
              alt={destination.name}
              className="w-full h-full object-cover opacity-75"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-blue-400" />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-7">
            <h1 className="text-white text-5xl font-bold drop-shadow-lg leading-tight">
              {destination.name}
            </h1>
            {destination.country && (
              <p className="text-white/80 text-2xl font-medium mt-1 drop-shadow">
                {destination.country}
              </p>
            )}
          </div>
        </div>
      </div>

      <main className="flex-1 w-full pt-0 pb-6">
        {sectionComponents[activeSection]}
      </main>
    </div>
  );
}

export default function TripPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-gray-400">Cargando...</div>}>
      <TripPageContent />
    </Suspense>
  );
}
