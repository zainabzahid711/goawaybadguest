//app/dashboard/sideBar.tsx

"use client";
import { Search, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-300 transition-all duration-300 z-40 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Sidebar Content */}
      <div className="p-4 pt-6">
        {isOpen && (
          <h2 className="text-sm font-semibold text-gray-700 mb-4">
            Navigation
          </h2>
        )}

        <nav className="space-y-2">
          {/* Search Bad Guests */}
          <Link
            href="/dashboard/searchBadGuest"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/searchBadGuest"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Search className="w-5 h-5 flex-shrink-0" />
            {isOpen && (
              <span className="text-sm font-medium">Search Bad Guests</span>
            )}
          </Link>

          {/* Report Bad Guest */}
          <Link
            href="/dashboard/reportBadGuest"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/reportBadGuest"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {isOpen && (
              <span className="text-sm font-medium">Report Bad Guest</span>
            )}
          </Link>
        </nav>
      </div>
    </aside>
  );
}
