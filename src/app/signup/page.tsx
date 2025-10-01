"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  hotelName: string;
  website: string;
  phoneNumber: string;
  location: string;
  yearsInBusiness: string;
  bookingEngine: string;
}
interface Field {
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  min?: string;
}

const STEPS: { fields: Field[] }[] = [
  {
    fields: [
      { name: "firstName", placeholder: "First Name", required: true },
      { name: "lastName", placeholder: "Last Name", required: true },
    ],
  },
  {
    fields: [
      { name: "email", type: "email", placeholder: "Email", required: true },
      {
        name: "password",
        type: "password",
        placeholder: "Password",
        minLength: 8,
        required: true,
      },
    ],
  },
  {
    fields: [
      { name: "hotelName", placeholder: "Hotel Name", required: true },
      { name: "website", type: "url", placeholder: "Website" },
      {
        name: "yearsInBusiness",
        type: "number",
        placeholder: "Years in Business",
        min: "0", // take min as string
      },
    ],
  },
  {
    fields: [
      { name: "phoneNumber", type: "tel", placeholder: "Phone Number" },
      { name: "location", placeholder: "Location" },
      { name: "bookingEngine", placeholder: "Booking Engine" },
    ],
  },
];

const VALIDATION_RULES = {
  firstName: (val: string) => (!val.trim() ? "First Name is required" : ""),
  lastName: (val: string) => (!val.trim() ? "Last Name is required" : ""),
  email: (val: string) => {
    if (!val.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(val)) return "Email is invalid";
    return "";
  },
  password: (val: string) => {
    if (!val) return "Password is required";
    if (val.length < 8) return "Password must be at least 8 characters";
    return "";
  },
  hotelName: (val: string) => (!val.trim() ? "Hotel Name is required" : ""),
};

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    hotelName: "",
    website: "",
    phoneNumber: "",
    location: "",
    yearsInBusiness: "",
    bookingEngine: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    const currentFields = STEPS[currentStep].fields;

    currentFields.forEach((field) => {
      if (
        field.required &&
        VALIDATION_RULES[field.name as keyof typeof VALIDATION_RULES]
      ) {
        const error = VALIDATION_RULES[
          field.name as keyof typeof VALIDATION_RULES
        ](formData[field.name as keyof FormData]);
        if (error) newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setErrors({});
  };

  const handleSignup = async () => {
    if (!validateStep()) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          yearsInBusiness: formData.yearsInBusiness
            ? parseInt(formData.yearsInBusiness)
            : null,
        }),
      });

      if (res.ok) {
        toast.success("Account Created Successfully!");
        // Redirect after successful signup
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        const { error } = await res.json();
        toast.error(error || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8 px-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#9DCC3C]/20 to-[#9DCC3C]/10 rounded-full flex items-center justify-center">
            <Image src="/tree.png" alt="treeLogo" height={50} width={50} />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h1>
          <p className="text-gray-500">Step {currentStep + 1} to 4</p>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          className="space-y-6"
        >
          <div className="space-y-4">
            {STEPS[currentStep].fields.map((field) => (
              <div key={field.name}>
                <Input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof FormData]}
                  onChange={handleChange}
                  min={field.min}
                  minLength={field.minLength}
                  required={field.required}
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm mt-1 ml-4">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4 justify-center">
            {currentStep > 0 && <Button onClick={handleBack}>Back</Button>}

            {currentStep < STEPS.length - 1 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                loading={isLoading}
              >
                Continue
              </Button>
            ) : (
              <Button type="submit" variant="primary" onClick={handleSignup}>
                Create Account
              </Button>
            )}
          </div>

          {/* Login Link */}
          {currentStep === 0 && (
            <p className="text-sm text-center text-gray-600 pt-4">
              Already have an account?
              <Link
                href="/login"
                className="text-[#9DCC3C] hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
