"use client";

import dynamic from "next/dynamic";
import { IoConstructOutline } from "react-icons/io5";

// ── Lottie (lazy, sin SSR) ────────────────────────────────────────────────────
// 1. Instala la librería:        npm install lottie-react
// 2. Descarga un JSON de         https://lottiefiles.com  (ej. "maintenance" o "construction")
// 3. Guarda el archivo como      src/app/trip/components/maintenance-anim.json
// 4. Descomenta las dos líneas marcadas con  ← DESCOMENTAR
//
import animationData from "./maintenance-anim.json";   // ← DESCOMENTAR
const Lottie = dynamic(() => import("lottie-react"), { ssr: false }); // ← DESCOMENTAR (también quitar el null de abajo)

// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  title: string;
  description: string;
  accent?: "blue" | "purple";
};

export default function MaintenanceView({ title, description, accent = "blue" }: Props) {
  const ring  = accent === "blue" ? "border-blue-100"    : "border-purple-100";
  const badge = accent === "blue" ? "bg-blue-50 text-blue-500"  : "bg-purple-50 text-purple-500";
  const dot1  = accent === "blue" ? "bg-blue-200"   : "bg-purple-200";
  const dot2  = accent === "blue" ? "bg-blue-100"   : "bg-purple-100";
  const dot3  = accent === "blue" ? "bg-cyan-100"   : "bg-pink-100";

  return (
    <div className="flex flex-col items-center justify-center min-h-[420px] px-6 py-12">
      <div className={`relative bg-white rounded-3xl border ${ring} shadow-sm p-10 max-w-md w-full text-center overflow-hidden`}>

        {/* Decorative blobs */}
        <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full ${dot1} opacity-40 blur-2xl`} />
        <div className={`absolute -bottom-8 -left-8  w-32 h-32 rounded-full ${dot2} opacity-40 blur-2xl`} />
        <div className={`absolute top-1/2  right-4   w-16 h-16 rounded-full ${dot3} opacity-30 blur-xl`}  />

        {/* ── Lottie animation ─────────────────────────────────────────────
            Cuando tengas el JSON y la librería instalada, reemplaza el bloque
            del ícono de abajo (el <div> del IoConstructOutline) por esto:

            <div className="flex justify-center mb-4">
              <Lottie
                animationData={animationData}
                loop={true}
                className="w-56 h-56"
              />
            </div>
        ───────────────────────────────────────────────────────────────── */}

        {/* Ícono placeholder — elimina este bloque cuando pongas el Lottie */}
       <div className="flex justify-center mb-4">
  <Lottie
    animationData={animationData}
    loop={true}
    className="w-56 h-56"
  />
</div>


        {/* Badge */}
        <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${badge}`}>
          En mantenimiento
        </span>

        {/* Title */}
        <h2 className="text-xl font-black text-gray-800 mb-2 leading-tight">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          {description}
        </p>

        {/* Animated dots */}
        <div className="flex items-center justify-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${dot1} animate-bounce`} style={{ animationDelay: "0ms"   }} />
          <span className={`w-2 h-2 rounded-full ${dot1} animate-bounce`} style={{ animationDelay: "150ms" }} />
          <span className={`w-2 h-2 rounded-full ${dot1} animate-bounce`} style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
