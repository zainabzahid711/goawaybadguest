"use client";
import React, { useState } from "react";

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search by Name"
        className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 lg:py-4 
                   rounded-full bg-white/20 backdrop-blur-md 
                   border border-white/30 text-white placeholder-white/70 
                   text-sm sm:text-base lg:text-lg 
                   focus:outline-none focus:ring-2 focus:ring-[#9DCC3C] 
                   focus:bg-white/25 transition-all"
      />
      <button className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
