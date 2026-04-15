"use client";
import { motion } from "motion/react";
import ParallaxSection from "./ParallaxSection";
import { IoMapOutline, IoCalendarOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const steps = [
  {
    number: "01",
    icon: <IoMapOutline className="text-2xl" />,
    title: "Busca tu destino",
    description:
      "Explora el mapa interactivo, descubre ciudades y encuentra inspiración para tu próximo viaje.",
  },
  {
    number: "02",
    icon: <IoCalendarOutline className="text-2xl" />,
    title: "Arma tu itinerario",
    description:
      "Agrega vuelos, hotel, restaurantes y puntos de interés. Todo organizado día a día en un solo lugar.",
  },
  {
    number: "03",
    icon: <IoCheckmarkCircleOutline className="text-2xl" />,
    title: "Confirma y viaja",
    description:
      "Revisa tu plan completo, confirma tu viaje y viaja con todo listo desde una sola plataforma.",
  },
];

const stats = [
  { value: "50%",  label: "Menos tiempo planificando" },
  { value: "4",    label: "Servicios integrados"      },
  { value: "180+", label: "Países disponibles"        },
  { value: "1",    label: "Sola plataforma"           },
];

export default function HowItWorksSection() {
  return (
    <ParallaxSection
      id="como-funciona"
      variant="light"
      className="bg-white px-6 py-24 md:px-16 lg:px-24"
    >
      <div className="mx-auto max-w-6xl flex flex-col gap-20">

        {/* Header */}
        <motion.div
          className="flex flex-col gap-4 max-w-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="h-[2px] bg-cyan-500"
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-600">
              Cómo funciona
            </span>
          </div>
          <h2 className="text-4xl font-medium leading-tight text-slate-800 md:text-5xl">
            De la idea al itinerario{" "}
            <span className="italic text-cyan-600">en minutos</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-5"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-white flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {step.icon}
                </motion.div>
                <span className="text-5xl font-bold text-slate-100 leading-none">
                  {step.number}
                </span>
              </div>

              {i < steps.length - 1 && (
                <motion.div
                  className="hidden md:block h-[1px] w-full bg-slate-100 mt-1 mb-1"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                  style={{ originX: 0 }}
                />
              )}

              <h3 className="text-xl font-semibold text-slate-800">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-4 py-6 text-center"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
            >
              <span className="text-3xl font-bold text-slate-900 md:text-4xl">{value}</span>
              <span className="mt-1 text-xs text-slate-500">{label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </ParallaxSection>
  );
}
