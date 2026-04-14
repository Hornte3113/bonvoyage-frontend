"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const STORAGE_KEY = "bv_cookie_consent";

type ConsentValue = "all" | "essential";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  function handleAccept(value: ConsentValue) {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-xl"
        >
          <div className="flex items-center gap-4 rounded-2xl bg-white border border-gray-200 shadow-xl px-5 py-4">

            {/* Cookie image */}
            <img
              src="/images/cookie.png"
              alt="Cookie"
              className="w-14 h-14 shrink-0 object-contain"
            />

            {/* Text + buttons */}
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <p className="flex-1 text-sm text-gray-700 leading-snug">
                Usamos cookies para mejorar tu experiencia.{" "}
                <Link
                  href="/cookies"
                  className="text-gray-500 underline underline-offset-2 hover:text-gray-800 transition-colors whitespace-nowrap"
                >
                  Ver política de cookies
                </Link>
              </p>

              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => handleAccept("essential")}
                  className="rounded-full bg-black px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-gray-800"
                >
                  Solo esenciales
                </button>
                <button
                  onClick={() => handleAccept("all")}
                  className="rounded-full border border-gray-300 px-5 py-2 text-xs font-medium text-gray-700 transition-colors hover:border-gray-500 hover:text-gray-900"
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
