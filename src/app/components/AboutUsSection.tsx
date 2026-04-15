"use client";
import { motion } from "motion/react";
import { IoEarthOutline, IoRocketOutline, IoHeartOutline } from "react-icons/io5";

const values = [
  {
    number: "01",
    icon: <IoEarthOutline className="text-lg" />,
    title: "Misión",
    description:
      "Simplificar la planificación de viajes para que cada persona pueda explorar el mundo sin estrés, con todo en un solo lugar.",
  },
  {
    number: "02",
    icon: <IoRocketOutline className="text-lg" />,
    title: "Visión",
    description:
      "Ser la plataforma de referencia para viajeros de habla hispana, conectando sueños con itinerarios reales y accesibles.",
  },
  {
    number: "03",
    icon: <IoHeartOutline className="text-lg" />,
    title: "Valores",
    description:
      "Pasión por los viajes, innovación tecnológica y compromiso con una experiencia humana, intuitiva y memorable.",
  },
];

const stats = [
  { value: "2024", label: "Año de fundación" },
  { value: "180+", label: "Países disponibles" },
  { value: "4",    label: "Servicios integrados" },
  { value: "100%", label: "Enfoque en el viajero" },
];

export default function AboutUsSection() {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-slate-900 px-6 py-28 md:px-16 lg:px-24"
    >
      {/* Decorative gradient blob */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-cyan-400/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl flex flex-col gap-24">

        {/* ── Top split: headline left | text right ── */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16 md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <motion.span
                className="h-[2px] bg-cyan-400"
                initial={{ width: 0 }}
                whileInView={{ width: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Sobre nosotros
              </span>
            </div>
            <h2 className="text-4xl font-black uppercase leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
              NACIDOS
              <br />
              PARA{" "}
              <span className="italic font-black text-cyan-400">EXPLORAR</span>
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <p className="text-base leading-relaxed text-slate-300">
              Bon Voyage nació de la frustración de planificar viajes con decenas de pestañas
              abiertas. Somos un equipo apasionado por el turismo y la tecnología, comprometidos
              a hacer que cada viaje sea inolvidable desde su primera planificación.
            </p>
            {/* Inline stats */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 pt-2">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                >
                  <span className="block text-3xl font-bold text-cyan-400">{value}</span>
                  <span className="text-xs text-slate-500">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <motion.div
          className="h-[1px] w-full bg-white/10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ originX: 0 }}
        />

        {/* ── Values: numbered horizontal list ── */}
        <div className="flex flex-col gap-0">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              className="group grid grid-cols-1 md:grid-cols-[80px_180px_1fr] items-start gap-4 md:gap-8 border-b border-white/10 py-7 last:border-b-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              whileHover={{ x: 6 }}
            >
              {/* Number */}
              <span className="text-5xl font-black text-white/10 leading-none group-hover:text-cyan-400/30 transition-colors duration-300">
                {v.number}
              </span>

              {/* Title + icon */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                  {v.icon}
                </div>
                <h3 className="text-base font-semibold text-white">{v.title}</h3>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-slate-400">{v.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
