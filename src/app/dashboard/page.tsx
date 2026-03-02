"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import DestinationCard from "./components/DestinationCard";
import SavedDestinations from "./components/SavedDestinations";

const MapView = dynamic(() => import("./components/MapView"), { ssr: false });

type SelectedPlace = {
  name: string;
  lng: number;
  lat: number;
};

type Destination = {
  id: string;
  name: string;
  lng: number;
  lat: number;
};

const STORAGE_KEY = "bonvoyage_destinations";

export default function DashboardPage() {
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setDestinations(JSON.parse(stored));
  }, []);

  const handlePlaceSelect = useCallback((place: SelectedPlace) => {
    setSelectedPlace(place);
  }, []);

  const handleSave = useCallback((place: SelectedPlace) => {
    const newDestination: Destination = {
      id: crypto.randomUUID(),
      ...place,
    };
    const updated = [newDestination, ...destinations];
    setDestinations(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSelectedPlace(null);
  }, [destinations]);

  const handleDelete = useCallback((id: string) => {
    const updated = destinations.filter((d) => d.id !== id);
    setDestinations(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, [destinations]);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="relative flex-1">
        <MapView onPlaceSelect={handlePlaceSelect} />
        {selectedPlace && (
          <DestinationCard
            place={selectedPlace}
            onSave={handleSave}
            onCancel={() => setSelectedPlace(null)}
          />
        )}
      </div>
      <SavedDestinations destinations={destinations} onDelete={handleDelete} />
    </div>
  );
}
