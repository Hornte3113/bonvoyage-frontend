"use client";

import { useRef, useEffect } from "react";
import Map, { Marker, NavigationControl, Popup, type MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { IoLocationSharp, IoStar, IoBed, IoRestaurant, IoCompass, IoClose } from "react-icons/io5";

export type ItineraryMapItem = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "poi" | "restaurant" | "hotel";
  photoUrl?: string | null;
  rating?: number | null;
  address?: string;
  description?: string | null;
  dayNumber?: number;
};

type Props = {
  items: ItineraryMapItem[];
  selectedId: string | null;
  onSelectId: (id: string | null) => void;
  center: { lat: number; lng: number };
};

const TYPE_COLORS: Record<ItineraryMapItem["type"], string> = {
  hotel: "text-indigo-500",
  restaurant: "text-orange-500",
  poi: "text-blue-500",
};

const TYPE_COLORS_SELECTED: Record<ItineraryMapItem["type"], string> = {
  hotel: "text-indigo-700",
  restaurant: "text-orange-600",
  poi: "text-blue-700",
};

const BADGE: Record<ItineraryMapItem["type"], { label: string; cls: string }> = {
  poi: { label: "Lugar", cls: "bg-blue-50 text-blue-600" },
  restaurant: { label: "Restaurante", cls: "bg-orange-50 text-orange-500" },
  hotel: { label: "Hotel", cls: "bg-purple-50 text-purple-600" },
};

export default function ItineraryMap({ items, selectedId, onSelectId, center }: Props) {
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (!selectedId || !mapRef.current) return;
    const item = items.find((p) => p.id === selectedId);
    if (!item) return;
    mapRef.current.flyTo({ center: [item.lng, item.lat], zoom: 15, duration: 1000 });
  }, [selectedId, items]);

  const selectedItem = selectedId ? items.find((i) => i.id === selectedId) : null;
  const Icon = selectedItem
    ? selectedItem.type === "hotel" ? IoBed : selectedItem.type === "restaurant" ? IoRestaurant : IoCompass
    : IoCompass;

  return (
    <Map
      ref={mapRef}
      initialViewState={{ longitude: center.lng, latitude: center.lat, zoom: 13 }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      onClick={() => onSelectId(null)}
    >
      <NavigationControl position="top-right" />

      {items.map((item) => {
        const isSelected = selectedId === item.id;
        const colorClass = isSelected ? TYPE_COLORS_SELECTED[item.type] : TYPE_COLORS[item.type];
        return (
          <Marker
            key={item.id}
            longitude={item.lng}
            latitude={item.lat}
            anchor="bottom"
            onClick={(e) => { e.originalEvent.stopPropagation(); onSelectId(item.id); }}
          >
            <div
              title={item.name}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected ? "scale-150 drop-shadow-lg" : "scale-100 hover:scale-125"
              }`}
            >
              <IoLocationSharp className={`text-3xl ${colorClass}`} />
            </div>
          </Marker>
        );
      })}

      {selectedItem && (
        <Popup
          longitude={selectedItem.lng}
          latitude={selectedItem.lat}
          anchor="bottom"
          offset={44}
          closeButton={false}
          closeOnClick={false}
          onClose={() => onSelectId(null)}
          className="!p-0 !rounded-2xl !shadow-xl !border-0"
          maxWidth="260px"
        >
          <div
            className="bg-white rounded-2xl overflow-hidden w-64 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => onSelectId(null)}
              className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
            >
              <IoClose className="text-white text-xs" />
            </button>

            {/* Photo */}
            <div className="w-full h-28 bg-gray-100 overflow-hidden">
              {selectedItem.photoUrl ? (
                <img src={selectedItem.photoUrl} alt={selectedItem.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <Icon className="text-3xl text-gray-200" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full ${BADGE[selectedItem.type].cls}`}>
                  {BADGE[selectedItem.type].label}
                </span>
                {selectedItem.dayNumber && (
                  <span className="text-[9px] text-gray-400">Día {selectedItem.dayNumber}</span>
                )}
              </div>

              <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2">{selectedItem.name}</h3>

              {selectedItem.rating && (
                <div className="flex items-center gap-1">
                  <IoStar className="text-amber-400 text-xs" />
                  <span className="text-xs font-semibold text-gray-700">{selectedItem.rating.toFixed(1)}</span>
                </div>
              )}

              {selectedItem.description && (
                <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">{selectedItem.description}</p>
              )}

              {selectedItem.address && (
                <p className="text-[10px] text-gray-400 line-clamp-1">{selectedItem.address}</p>
              )}
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}
