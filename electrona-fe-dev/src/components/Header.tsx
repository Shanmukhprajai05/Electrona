import React from "react";
import { PageTab } from "../types";

interface HeaderProps {
  activeTab: PageTab;
  setActiveTab: (tab: PageTab) => void;
  onOpenStore: () => void;
}

export default function Header({
  activeTab,
  setActiveTab,
}: HeaderProps) {

  const tabs: PageTab[] = [
    "HOME",
    "PRODUCTS",
    "SPORTS",
    "ABOUT",
  ];

  // Check login status
  const isLoggedIn = !!localStorage.getItem("idToken");

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 border-b border-neutral-100/80 backdrop-blur-md py-3.5 md:py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center transition-all duration-300 shadow-sm shadow-neutral-100/20">

      {/* ================= Logo ================= */}

      <div className="w-full md:w-auto flex justify-between items-center md:flex-1">

        <div
          className="flex items-center cursor-pointer group select-none"
          onClick={() => setActiveTab("HOME")}
        >
          <div className="flex flex-col">

            <span className="text-lg md:text-xl font-black tracking-[0.25em] font-display text-neutral-900 transition-colors duration-300 group-hover:text-[#FF6A00]">
              ELECTRONA
            </span>

            <span className="text-[6.5px] tracking-[0.55em] font-mono uppercase font-bold text-neutral-500">
              Performance Labs
            </span>

          </div>
        </div>

        {/* Mobile Indicator */}

        <div className="flex md:hidden items-center gap-1.5 px-2 py-0.5 rounded border border-neutral-100 bg-neutral-50/50">

          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6A00] animate-pulse"></span>

          <span className="text-[8px] font-mono font-bold uppercase tracking-widest">
            LIVE
          </span>

        </div>

        {/* Mobile Login Button (visible on small screens) */}
        <div className="md:hidden ml-3">
          <button
            onClick={() => setActiveTab(isLoggedIn ? "PROFILE" : "LOGIN")}
            className="px-3 py-1 border border-[#FF6A00] rounded-md text-xs font-semibold text-black hover:bg-[#FF6A00] hover:text-white transition-all duration-300"
          >
            {isLoggedIn ? "Profile" : "Login"}
          </button>
        </div>

      </div>

      {/* ================= Navigation ================= */}

      <nav className="flex items-center justify-center gap-6 md:gap-8 flex-1">

        {tabs.map((tab) => {

          const isSelected = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative font-semibold text-xs tracking-[0.18em] uppercase py-1.5 transition-all duration-300 ${
                isSelected
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}

              {isSelected && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#FF6A00] rounded-full"></span>
              )}

            </button>
          );
        })}

      </nav>

      {/* ================= Login / Profile Button ================= */}

      <div className="hidden md:flex md:flex-1 justify-end">

        <button
          onClick={() =>
            setActiveTab(
              isLoggedIn ? "PROFILE" : "LOGIN"
            )
          }
          className="px-6 py-2 border border-[#FF6A00] rounded-md text-sm font-semibold text-black hover:bg-[#FF6A00] hover:text-white transition-all duration-300"
        >
          {isLoggedIn ? "PROFILE" : "LOGIN"}
        </button>

      </div>

    </header>
  );
}