"use client";

import { TripSection } from "../page";
import { IoAirplane, IoBed, IoCompass, IoRestaurant } from "react-icons/io5";

type Tab = {
  id: TripSection;
  label: string;
  icon: React.ReactNode;
};

const tabs: Tab[] = [
  { id: "vuelos",       label: "Vuelos",           icon: <IoAirplane className="text-xl" /> },
  { id: "hospedaje",    label: "Hospedajes",        icon: <IoBed className="text-xl" /> },
  { id: "puntos",       label: "Puntos de interés", icon: <IoCompass className="text-xl" /> },
  { id: "restaurantes", label: "Restaurantes",      icon: <IoRestaurant className="text-xl" /> },
];

type Props = {
  active: TripSection;
  onChange: (section: TripSection) => void;
};

export default function TripNav({ active, onChange }: Props) {
  return (
    <div className="w-full sticky top-0 z-10" style={{ backgroundColor: "#1a3a6b" }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-2 py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`
                flex items-center gap-2.5 px-5 py-2 rounded-full text-sm font-medium
                transition-all duration-200 whitespace-nowrap text-white
                ${active === tab.id
                  ? "border border-white/80 bg-white/10"
                  : "border border-transparent hover:bg-white/10"
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
