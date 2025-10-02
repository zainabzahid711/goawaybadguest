// app/dashboard/page.tsx

"use client";
import { useState, useEffect } from "react";
import { Menu, AlertCircle, ChevronRight } from "lucide-react";
import Sidebar from "./sideBar";
// import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    // Load sidebar state from localStorage on mount
    const saved = localStorage.getItem("sidebarOpen");
    if (saved !== null) {
      setSidebarOpen(JSON.parse(saved));
    }
  }, []);

  const handleToggle = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem("sidebarOpen", JSON.stringify(newState));
  };

  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <div onClick={(e) => e.stopPropagation()}>
            <Sidebar isOpen={sidebarOpen} onToggle={handleToggle} />
          </div>

          {/* Main Content Area - Adjusts based on sidebar */}
          <div
            className={`flex-1 flex flex-col transition-all duration-300 ${
              sidebarOpen ? "ml-64" : "ml-16"
            }`}
          >
            {/* Header */}
            <header className="bg-white border-b border-gray-300 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleToggle}
                      className="cursor-pointer text-gray-600"
                    >
                      <Menu className="w-6 h-6" />
                    </button>

                    <h1 className="text-xl font-bold text-gray-800">
                      Go Away Bad Guest
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    user
                  </span>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-hidden">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
