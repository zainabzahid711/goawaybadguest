"use client";
import React from "react";
import Link from "next/link";
import Loader from "./loader";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  href,
  loading = false,
  disabled = false,
  type = "button",
}) => {
  const baseStyles =
    "px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 text-sm sm:text-base rounded-full font-medium transition-all duration-200 cursor-pointer inline-block text-center";
  const variants = {
    primary: "bg-[#9DCC3C] text-[#2D5016] hover:bg-[#8BB82F]",
    secondary: "bg-white text-black hover:bg-gray-100",
    outline:
      "border-2 border-white/60 text-white hover:bg-white/10 backdrop-blur-sm",
  };

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${variants[variant]}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={loading || disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${
        loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {loading ? (
        <Loader size={20} color={variant === "primary" ? "white" : "#333"} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
