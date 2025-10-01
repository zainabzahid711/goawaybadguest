"use client";
import Image from "next/image";
import SearchBar from "../ui/searchBar";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center text-white -mt-8 sm:-mt-12 lg:-mt-16 px-4">
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <Image
          src={"/logoBadGuest.png"}
          alt="logo-bad-guest"
          width={100}
          height={100}
          className="w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 xl:w-[150px] xl:h-[150px] rounded-lg"
        />
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 tracking-tight text-white drop-shadow-2xl px-2">
        Go Away Bad Guest
      </h1>

      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light mb-6 sm:mb-8 lg:mb-12 text-white/90 tracking-wide">
        Judge and be Judged
      </p>

      <SearchBar />
    </div>
  );
};

export default Hero;
