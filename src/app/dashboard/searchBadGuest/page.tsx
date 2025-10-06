//app/searchBadGues/page.tsx

"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";

interface Guest {
  id: number;
  name: string;
  date: string;
  status: "Legitimate" | "Nuisance";
  reservationUnder: string;
  department: string;
  filedBy: string;
  complaint: string;
  resolution?: string;
}

const mockGuests: Guest[] = [
  {
    id: 1,
    name: "Special Guest",
    date: "Mar 27, 2025",
    status: "Legitimate",
    reservationUnder: "New",
    department: "Housekeeping",
    filedBy: "Guest",
    complaint: "a",
    resolution: "a",
  },
  {
    id: 2,
    name: "Jon Doe",
    date: "Mar 27, 2025",
    status: "Nuisance",
    reservationUnder: "Booking #4532",
    department: "Front Desk",
    filedBy: "Staff",
    complaint:
      "Refused to pay for minibar charges and became aggressive with staff.",
    resolution: "Guest was asked to leave the premises.",
  },
  {
    id: 3,
    name: "guest1",
    date: "Apr 2, 2025",
    status: "Legitimate",
    reservationUnder: "Walk-in",
    department: "Maintenance",
    filedBy: "Guest",
    complaint: "Reported noise complaint from neighboring room.",
    resolution: "Issue resolved by moving guest to quieter room.",
  },
  {
    id: 4,
    name: "John Coleman",
    date: "Apr 14, 2025",
    status: "Nuisance",
    reservationUnder: "Booking #8821",
    department: "Security",
    filedBy: "Security",
    complaint:
      "Smoking in non-smoking room, refused to comply with hotel policy.",
    resolution: "Fined $250 and blacklisted.",
  },
];

export default function SearchBadGuestPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  const filteredGuests = mockGuests.filter((guest) =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full bg-white">
      {/* Guest List Section */}
      <div className="flex-1 flex flex-col border-r border-gray-200">
        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Guest Cards */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {filteredGuests.map((guest) => (
            <div
              key={guest.id}
              onClick={() => setSelectedGuest(guest)}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                selectedGuest?.id === guest.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{guest.name}</h3>
                  <p className="text-sm text-gray-500">{guest.date}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    guest.status === "Legitimate"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {guest.status}
                </span>
              </div>
              <button className="text-sm text-blue-600 hover:underline">
                Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Guest Details Panel */}
      <div className="hidden lg:block w-1/2 bg-white overflow-y-auto">
        {selectedGuest ? (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-2xl font-bold">{selectedGuest.name}</h2>
              <button onClick={() => setSelectedGuest(null)}>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Reservation Under
                </label>
                <p className="mt-1 text-base text-gray-900">
                  {selectedGuest.reservationUnder}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Date
                </label>
                <p className="mt-1 text-base text-gray-900">
                  {selectedGuest.date}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Department
                </label>
                <p className="mt-1 text-base text-gray-900">
                  {selectedGuest.department}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">
                  Filed By
                </label>
                <p className="mt-1 text-base text-gray-900">
                  {selectedGuest.filedBy}
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Complaint
              </label>
              <div className="mt-2 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <p className="text-gray-800">{selectedGuest.complaint}</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Resolution
              </label>
              <div className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded">
                <p className="text-gray-800">
                  {selectedGuest.resolution || "No resolution provided yet."}
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">
                Legitimacy
              </label>
              <div className="mt-2">
                <span
                  className={`inline-block px-4 py-2 text-sm font-medium rounded ${
                    selectedGuest.status === "Legitimate"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedGuest.status}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a guest to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}
