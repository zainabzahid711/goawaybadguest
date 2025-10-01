"use client";
import React from "react";

interface InputProps {
  type?: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: string;
  minLength?: number;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required = false,
  min,
  minLength,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      minLength={minLength}
      className="w-full px-6 py-4 border-2 border-gray-300 rounded-full 
                 text-gray-700 placeholder-gray-400 
                 focus:outline-none focus:border-[#9DCC3C] 
                 transition-colors bg-white"
    />
  );
};

export default Input;
