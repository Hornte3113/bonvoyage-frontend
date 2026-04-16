"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@clerk/nextjs";
import {
  IoStar,
  IoLocationSharp,
  IoCompass,
  IoSearch,
  IoAdd,
  IoCheckmark,
  IoArrowForward,
  IoClose,
} from "react-icons/io5";
import type { ItineraryItem, TripDay } from "../types";

const POIMap = dynamic(() => import("./POIMap"), { ssr: false });

type POI = {
  id: string;
  name: string;
  address: string;
  rating: number | null;
  ratingCount: number | null;
  priceLevel: string | null;
  description: string | null;
  photoUrl: string | null;
  lat: number;
  lng: number;
  isOpenNow?: boolean | null;
  todayHours?: string | null;
  weeklyHours?: string[] | null;
};

type Destination = {
  name: string;
  country: string;
  lat: number;
  lng: number;
  photoUrl: string | null;
};

type AddOptions = { start_time?: string; end_time?: string; notes?: string };

type Props = {
  destination: Destination;
  tripDays?: TripDay[];
  onAddToItinerary: (item: ItineraryItem, dayNumber: number, options?: AddOptions) => void;
  readOnly?: boolean;
};

import { createApiClient } from "@/lib/api";

export default function PointsOfInterestSection({
  destination,
  tripDays,
  onAddToItinerary,
  readOnly = false,
}: Props) {
  const { getToken } = useAuth();
  const days: TripDay[] = tripDays ?? [];

  const [places, setPlaces] = useState<POI[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [pickerOpenId, setPickerOpenId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPOIs() {
      setLoading(true);
      const api = createApiClient(getToken);
      try {
        const data = await api.get<{ places?: POI[] }>(
          `/api/v1/poi?lat=${destination.lat}&lng=${destination.lng}`
        );
        setPlaces(data.places ?? []);
        if (data.places && data.places.length > 0) setSelectedId(data.places[0].id);
      } catch {
        setPlaces([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPOIs();
  }, [destination.lat, destination.lng]);

  const filtered = useMemo(() => {
    if (!query.trim()) return places;
    const q = query.toLowerCase();
    return places.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q)
    );
  }, [places, query]);

  function buildItem(poi: POI): ItineraryItem {
    return {
      id: poi.id,
      type: "poi",
      name: poi.name,
      address: poi.address,
      lat: poi.lat,
      lng: poi.lng,
      photoUrl: poi.photoUrl,
      rating: poi.rating,
      priceLevel: poi.priceLevel,
      description: poi.description,
      isOpenNow: poi.isOpenNow,
      todayHours: poi.todayHours,
      weeklyHours: poi.weeklyHours,
    };
  }

  function handleAddToDay(poi: POI, day: number) {
    onAddToItinerary(buildItem(poi), day);
    setAddedIds((prev) => new Set(prev).add(poi.id));
    setPickerOpenId(null);
  }

  // ── Loading / empty ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh] gap-3 text-gray-400">
        <IoCompass className="text-4xl animate-spin" />
        <span className="text-sm">Buscando puntos de interés...</span>
      </div>
    );
  }

  if (places.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] gap-3 text-gray-400">
        <IoCompass className="text-6xl text-gray-200" />
        <p className="text-sm">No se encontraron puntos de interés cerca de {destination.name}.</p>
      </div>
    );
  }

  // ── Main layout ────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-[calc(100vh-112px)]">

      {/* ── Header ── */}
      <div className="px-6 max-w-6xl mx-auto w-full pt-6 pb-4 flex items-center justify-between gap-6 flex-shrink-0">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Puntos de interés{" "}
            <span className="text-blue-500">en {destination.name}</span>
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {filtered.length}{" "}
            {filtered.length === 1 ? "lugar encontrado" : "lugares encontrados"}
          </p>
        </div>

        {/* Search pill */}
        <div className="relative w-60 flex-shrink-0">
          <IoSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar lugar..."
            className="w-full pl-10 pr-9 py-2.5 rounded-full border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <IoClose className="text-sm" />
            </button>
          )}
        </div>
      </div>

      {/* ── Body: cards + map ── */}
      <div className="flex-1 min-h-0 px-6 max-w-6xl mx-auto w-full pb-5 flex gap-5">

        {/* Cards — scrollable */}
        <div className="flex-1 min-w-0 overflow-y-auto scrollbar-hide">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3 text-gray-400 mt-10">
              <IoCompass className="text-4xl text-gray-200" />
              <p className="text-sm">Sin resultados para &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 pb-8 pt-2">
              {filtered.map((poi) => (
                <POICard
                  key={poi.id}
                  poi={poi}
                  days={days}
                  selected={selectedId === poi.id}
                  added={addedIds.has(poi.id)}
                  pickerOpen={pickerOpenId === poi.id}
                  readOnly={readOnly}
                  onClick={() => setSelectedId(poi.id)}
                  onPickerToggle={() =>
                    setPickerOpenId(pickerOpenId === poi.id ? null : poi.id)
                  }
                  onAddToDay={(day) => handleAddToDay(poi, day)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Map — big, fills full height */}
        <div className="w-[48%] flex-shrink-0 rounded-3xl overflow-hidden shadow-lg border border-gray-100">
          <POIMap
            places={filtered}
            selectedId={selectedId}
            onSelectId={(id) => setSelectedId(id)}
            center={{ lat: destination.lat, lng: destination.lng }}
          />
        </div>
      </div>
    </div>
  );
}

// ── POI Card ──────────────────────────────────────────────────────────────────
function POICard({
  poi,
  days,
  selected,
  added,
  pickerOpen,
  readOnly,
  onClick,
  onPickerToggle,
  onAddToDay,
}: {
  poi: POI;
  days: TripDay[];
  selected: boolean;
  added: boolean;
  pickerOpen: boolean;
  readOnly: boolean;
  onClick: () => void;
  onPickerToggle: () => void;
  onAddToDay: (day: number) => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer group transition-all duration-200 ${
        selected ? "scale-[1.02]" : ""
      }`}
    >
      {/* ── Image ── */}
      <div
        className={`relative h-52 rounded-3xl overflow-hidden transition-all duration-200 ${
          selected ? "shadow-xl ring-2 ring-blue-400 ring-offset-2" : "shadow-md"
        }`}
      >
        {poi.photoUrl ? (
          <img
            src={poi.photoUrl}
            alt={poi.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <IoCompass className="text-5xl text-gray-300" />
          </div>
        )}

        {/* Rating badge — top left */}
        {poi.rating && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
            <IoStar className="text-amber-400 text-xs" />
            <span className="text-xs font-bold text-gray-800">{poi.rating.toFixed(1)}</span>
            {poi.ratingCount && (
              <span className="text-[10px] text-gray-500">
                ({poi.ratingCount > 999
                  ? `${(poi.ratingCount / 1000).toFixed(1)}k`
                  : poi.ratingCount})
              </span>
            )}
          </div>
        )}

        {/* Add button — top right */}
        {!readOnly && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPickerToggle();
            }}
            title="Agregar al itinerario"
            className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-150 ${
              added
                ? "bg-green-500 text-white"
                : "bg-white/90 backdrop-blur-sm text-blue-500 hover:bg-blue-50 hover:scale-110"
            }`}
          >
            {added ? <IoCheckmark className="text-sm" /> : <IoAdd className="text-base" />}
          </button>
        )}

        {/* Day picker popover */}
        {pickerOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-12 right-3 z-20 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 w-44"
          >
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Agregar al día
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {days.map((d) => (
                <button
                  key={d.dayId}
                  onClick={() => onAddToDay(d.dayNumber)}
                  className="text-xs font-semibold text-gray-700 hover:bg-blue-500 hover:text-white rounded-xl py-1.5 transition-all bg-gray-50 border border-gray-100"
                >
                  {d.dayNumber}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── White info panel — overlaps image ── */}
      <div className="mx-3 -mt-9 relative z-10 bg-white rounded-2xl shadow-xl px-3.5 py-3">

        {/* Name + arrow */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-1 flex-1">
            {poi.name}
          </h3>
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <IoArrowForward className="text-[11px] text-gray-500 group-hover:text-blue-500 transition-colors" />
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <IoLocationSharp className="text-green-500 text-xs flex-shrink-0" />
          <span className="text-[11px] text-gray-500 line-clamp-1">{poi.address}</span>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
          {poi.rating ? (
            <div className="flex items-center gap-1">
              <IoStar className="text-amber-400 text-[10px]" />
              <span className="text-[11px] font-semibold text-gray-700">
                {poi.rating.toFixed(1)}
              </span>
              {poi.ratingCount && (
                <span className="text-[10px] text-gray-400">
                  ({poi.ratingCount > 999
                    ? `${(poi.ratingCount / 1000).toFixed(1)}k`
                    : poi.ratingCount} reseñas)
                </span>
              )}
            </div>
          ) : (
            <span />
          )}

          {poi.isOpenNow != null ? (
            <span
              className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                poi.isOpenNow
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {poi.isOpenNow ? "Abierto" : "Cerrado"}
            </span>
          ) : poi.priceLevel ? (
            <span className="text-[11px] font-bold text-gray-800">{poi.priceLevel}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
