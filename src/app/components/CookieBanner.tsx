"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const STORAGE_KEY = "bv_cookie_consent";

type ConsentValue = "all" | "essential" | null;

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function handleAccept(value: ConsentValue) {
    if (!value) return;
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl"
        >
          <div className="rounded-2xl bg-slate-900 border border-slate-700 px-6 py-5 shadow-2xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">

              {/* Texto */}
              <p className="flex-1 text-sm text-slate-300 leading-relaxed">
                Usamos cookies para mejorar tu experiencia.{" "}
                <Link
                  href="/cookies"
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                >
                  Ver política de cookies
                </Link>
              </p>

              {/* Botones */}
              <div className="flex shrink-0 flex-wrap gap-2">
                <button
                  onClick={() => handleAccept("essential")}
                  className="rounded-full border border-slate-600 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-slate-400 transition-colors hover:border-slate-400 hover:text-slate-200"
                >
                  Solo esenciales
                </button>
                <button
                  onClick={() => handleAccept("all")}
                  className="rounded-full bg-cyan-500 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-cyan-600"
                >
                  Aceptar todo
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
