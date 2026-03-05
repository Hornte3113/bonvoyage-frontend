"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { IoIosGlobe } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const menus = [
  { label: "Home",         href: "/"             },
  { label: "DiscoveryMap", href: "/dashboard"    },
  { label: "Destinos",     href: "/destinations" },
];

export default function TripHeader() {
  const pathname = usePathname();

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100 md:px-10">
      {/* Logo */}
      <div className="flex items-center gap-2 font-medium tracking-[4px] text-gray-800 text-xs uppercase">
        <IoIosGlobe className="text-xl text-blue-500" />
        Bon Voyage
      </div>

      {/* Menu */}
      <ul className="flex items-center gap-6 text-[11px] font-medium uppercase text-gray-600">
        {menus.map(({ label, href }) => (
          <motion.li layout key={href}>
            <Link
              href={href}
              className={`inline-block pb-0.5 transition-colors hover:text-gray-900 ${
                pathname === href
                  ? "border-b-2 border-blue-500 text-gray-900"
                  : "hover:border-b-2 hover:border-gray-300"
              }`}
            >
              {label}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Right side: cart + user */}
      <div className="flex items-center gap-4">
        <button className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900">
          <IoCartOutline className="text-xl" />
        </button>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-3 py-1 rounded border border-gray-400 text-gray-700 text-xs hover:bg-gray-100 transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
