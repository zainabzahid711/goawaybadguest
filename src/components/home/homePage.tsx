"use client";
import React from "react";
import Button from "../ui/Button";
import Hero from "./hero";

const HomePage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen h-screen overflow-hidden">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-100 pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/30 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pointer-events-none">
        {/* Navbar */}
        <div className="w-full flex justify-center sm:justify-center pointer-events-auto">
          <div className="flex gap-2 sm:gap-3">
            <Button variant="primary" href="/login">
              Login
            </Button>
            <Button variant="secondary" href="/signup">
              Sign Up
            </Button>
          </div>
        </div>

        {/* Hero */}
        <Hero />

        {/* Footer button */}
        <div className="w-full flex justify-center pb-2 sm:pb-4">
          <Button variant="outline" href="/contact">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
