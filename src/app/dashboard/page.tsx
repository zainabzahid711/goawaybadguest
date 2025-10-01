"use client";
import { useState } from "react";
import { Search, Menu, X, User, AlertCircle, Home } from "lucide-react";

interface Guest {
  id: number;
  name: string;
  date: string;
  status: "Legitimate" | "Nuisance";
  hotel: string;
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
    hotel: "Admin@123",
    reservationUnder: "New",
    department: "Housekeeping",
    filedBy: "Guest",
    complaint: "a",
    resolution: "",
  },
  {
    id: 2,
    name: "Jon Doe",
    date: "Mar 27, 2025",
    status: "Nuisance",
    hotel: "Admin@123",
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
    hotel: "Admin@123",
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
    hotel: "Admin@123",
    reservationUnder: "Booking #8821",
    department: "Security",
    filedBy: "Security",
    complaint:
      "Smoking in non-smoking room, refused to comply with hotel policy.",
    resolution: "Fined $250 and blacklisted.",
  },
];

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Navigation</h2>
          <button onClick={onClose} className="lg:hidden text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-blue-600 bg-blue-50 rounded-lg font-medium">
            <Search className="w-5 h-5" />
            Search Bad Guests
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            Report Bad Guest
          </button>
        </nav>
      </aside>
    </>
  );
};

const GuestCard = ({
  guest,
  onClick,
  isSelected,
}: {
  guest: Guest;
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 bg-white border rounded-lg cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "border-[#9DCC3C] shadow-md" : "border-gray-200"
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
      <button className="text-sm text-blue-600 hover:underline">Details</button>
    </div>
  );
};

const GuestDetails = ({ guest }: { guest: Guest | null }) => {
  if (!guest) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <User className="w-16 h-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Guest Selected
        </h3>
        <p className="text-gray-500">
          Please select a guest from the list to view their details
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Hotel */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase">
            Hotel
          </label>
          <p className="text-lg font-semibold text-gray-800 mt-1">
            {guest.hotel}
          </p>
        </div>

        {/* Guest Name */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase">
            Guest Name
          </label>
          <p className="text-2xl font-bold text-gray-800 mt-1">{guest.name}</p>
        </div>

        {/* Reservation & Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">
              Reservation Under
            </label>
            <p className="text-base font-medium text-gray-800 mt-1">
              {guest.reservationUnder}
            </p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">
              Date
            </label>
            <p className="text-base font-medium text-gray-800 mt-1">
              {guest.date}
            </p>
          </div>
        </div>

        {/* Department & Filed By */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">
              Department
            </label>
            <p className="text-base font-medium text-gray-800 mt-1">
              {guest.department}
            </p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">
              Filed By
            </label>
            <p className="text-base font-medium text-gray-800 mt-1">
              {guest.filedBy}
            </p>
          </div>
        </div>

        {/* Complaint */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase">
            Complaint
          </label>
          <div className="mt-2 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-gray-800">{guest.complaint}</p>
          </div>
        </div>

        {/* Resolution */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase">
            Resolution
          </label>
          <div className="mt-2 p-4 bg-gray-50 border border-gray-200 rounded min-h-[100px]">
            <p className="text-gray-800">
              {guest.resolution || "No resolution provided yet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BadGuestDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredGuests = mockGuests.filter((guest) =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                Go Away Bad Guest
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">Z</span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                Zainab
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Guest List */}
          <div className="w-full lg:w-1/2 border-r border-gray-200 flex flex-col bg-white">
            {/* Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9DCC3C] focus:border-transparent"
                />
              </div>
            </div>

            {/* Guest Cards */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {filteredGuests.map((guest) => (
                <GuestCard
                  key={guest.id}
                  guest={guest}
                  onClick={() => setSelectedGuest(guest)}
                  isSelected={selectedGuest?.id === guest.id}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-center gap-2">
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                &lt;
              </button>
              <button className="px-3 py-1 bg-[#9DCC3C] text-white rounded font-medium">
                1
              </button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                2
              </button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                3
              </button>
              <button className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
                &gt;
              </button>
            </div>
          </div>

          {/* Guest Details Panel */}
          <div className="hidden lg:block lg:w-1/2 bg-white">
            <GuestDetails guest={selectedGuest} />
          </div>
        </div>
      </div>

      {/* Mobile Guest Details Modal */}
      {selectedGuest && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={() => setSelectedGuest(null)}
        >
          <div
            className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Guest Details</h2>
              <button onClick={() => setSelectedGuest(null)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <GuestDetails guest={selectedGuest} />
          </div>
        </div>
      )}
    </div>
  );
}
