"use client";

import { IoLocationSharp, IoClose } from "react-icons/io5";

type SelectedPlace = {
  name: string;
  lng: number;
  lat: number;
};

type Props = {
  place: SelectedPlace;
  onSave: (place: SelectedPlace) => void;
  onCancel: () => void;
};

export default function DestinationCard({ place, onSave, onCancel }: Props) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-full max-w-sm bg-white  shadow-2xl p-5 border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 text-blue-600">
          <IoLocationSharp className="text-xl flex-shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider">Destino seleccionado</span>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <IoClose className="text-xl" />
        </button>
      </div>

      <p className="text-gray-800 font-medium text-sm mb-1 leading-snug">{place.name}</p>
      <p className="text-gray-400 text-xs mb-4">
        {place.lat.toFixed(4)}°, {place.lng.toFixed(4)}°
      </p>

      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={() => onSave(place)}
          className="flex-1 py-2  bg-blue-400 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Crear viaje
        </button>
         <button
          onClick={() => onSave(place)}
          className="flex-1 py-2 rounded-lg bg-blue-400 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Añadir a whislist
        </button>
      </div>
    </div>
  );
}
