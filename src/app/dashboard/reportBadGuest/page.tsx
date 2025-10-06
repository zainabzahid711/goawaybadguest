//app/reportBadGuest/page.tsx
// ============================================

"use client";
import { useState } from "react";
import { X } from "lucide-react";

export default function ReportBadGuestPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    guestName: "",
    reservationName: "",
    date: "",
    department: "",
    complaint: "",
    filedBy: "",
    resolution: "",
    legitimacy: "",
  });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setShowModal(false);
    setFormData({
      guestName: "",
      reservationName: "",
      date: "",
      department: "",
      complaint: "",
      filedBy: "",
      resolution: "",
      legitimacy: "",
    });
  };

  return (
    <div className="h-full bg-white p-12">
      {/* Header with Create Button */}
      <button
        onClick={() => setShowModal(true)}
        className="px-6 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors font-medium"
      >
        Create
      </button>
      <div className="mt-12 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg text-black font-semibold">Guest Complaints</h2>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex items-center justify-center h-[calc(100%-80px)]">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-2">
            Sorry, no matching records found
          </p>
          <p className="text-sm text-gray-400">0-0 OF 0</p>
        </div>
      </div>

      {/* Add Guest Complaint Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Add Guest Complaint</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Guest Name"
                value={formData.guestName}
                onChange={(e) =>
                  setFormData({ ...formData, guestName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="text"
                placeholder="Reservation Name"
                value={formData.reservationName}
                onChange={(e) =>
                  setFormData({ ...formData, reservationName: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <select
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
              >
                <option value="">Department</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Front Desk">Front Desk</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Security">Security</option>
              </select>

              <textarea
                placeholder="Complaint"
                value={formData.complaint}
                onChange={(e) =>
                  setFormData({ ...formData, complaint: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px] resize-none"
              />

              <select
                value={formData.filedBy}
                onChange={(e) =>
                  setFormData({ ...formData, filedBy: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
              >
                <option value="">Filed By</option>
                <option value="Guest">Guest</option>
                <option value="Staff">Staff</option>
                <option value="Security">Security</option>
                <option value="Management">Management</option>
              </select>

              <textarea
                placeholder="Resolution"
                value={formData.resolution}
                onChange={(e) =>
                  setFormData({ ...formData, resolution: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[80px] resize-none"
              />

              <select
                value={formData.legitimacy}
                onChange={(e) =>
                  setFormData({ ...formData, legitimacy: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700"
              >
                <option value="">Legitimacy</option>
                <option value="Legitimate">Legitimate</option>
                <option value="Nuisance">Nuisance</option>
              </select>

              {/* Form Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition-colors font-medium"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
