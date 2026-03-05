"use client";

import { useState } from "react";
import { IoAirplane, IoSwapHorizontal, IoSearch, IoPerson, IoChevronDown } from "react-icons/io5";

type Destination = {
  name: string;
  country: string;
  lat: number;
  lng: number;
  photoUrl: string | null;
};

type TripType = "ida-vuelta" | "solo-ida" | "multidestino";

type Props = {
  destination: Destination;
};

export default function FlightsSection({ destination }: Props) {
  const [tripType, setTripType] = useState<TripType>("ida-vuelta");
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState(
    destination.country ? `${destination.name}, ${destination.country}` : destination.name
  );
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState("economy");
  const [searched, setSearched] = useState(false);

  function swapLocations() {
    setOrigin(dest);
    setDest(origin);
  }

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearched(true);
  }

  return (
    <div className="space-y-6">
      {/* Search card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Trip type tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
          {(["ida-vuelta", "solo-ida", "multidestino"] as TripType[]).map((type) => (
            <button
              key={type}
              onClick={() => setTripType(type)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                tripType === type
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {type === "ida-vuelta" ? "Ida y vuelta" : type === "solo-ida" ? "Solo ida" : "Multidestino"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          {/* Origin / Destination row */}
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <label className="block text-xs font-medium text-gray-500 mb-1">Origen</label>
              <div className="relative">
                <IoAirplane className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-45" />
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="Ciudad o aeropuerto de salida"
                  required
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={swapLocations}
              className="mt-5 p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-400 hover:text-blue-500 flex-shrink-0"
            >
              <IoSwapHorizontal className="text-xl" />
            </button>

            <div className="flex-1 relative">
              <label className="block text-xs font-medium text-gray-500 mb-1">Destino</label>
              <div className="relative">
                <IoAirplane className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                  placeholder="Ciudad o aeropuerto de destino"
                  required
                  className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Dates + passengers row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Salida</label>
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                required
                className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-700"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Regreso {tripType === "solo-ida" && <span className="text-gray-300">(opcional)</span>}
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                disabled={tripType === "solo-ida"}
                className="w-full px-3 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Pasajeros</label>
              <div className="relative">
                <IoPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full pl-9 pr-8 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-700 appearance-none bg-white"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "pasajero" : "pasajeros"}</option>
                  ))}
                </select>
                <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Clase</label>
              <div className="relative">
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="w-full px-3 pr-8 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-gray-700 appearance-none bg-white"
                >
                  <option value="economy">Económica</option>
                  <option value="premium">Premium Economy</option>
                  <option value="business">Business</option>
                  <option value="first">Primera clase</option>
                </select>
                <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Search button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            <IoSearch className="text-lg" />
            Buscar vuelos
          </button>
        </form>
      </div>

      {/* Results placeholder */}
      {searched && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
          <IoAirplane className="text-5xl text-blue-200 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">
            Búsqueda de vuelos disponible próximamente.
          </p>
          <p className="text-gray-400 text-xs mt-1">
            {origin} → {dest} · {passengers} {passengers === 1 ? "pasajero" : "pasajeros"} · {cabinClass}
          </p>
        </div>
      )}
    </div>
  );
}
