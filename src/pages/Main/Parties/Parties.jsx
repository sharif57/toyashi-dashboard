

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  X,
  Users,
  Trash2,
} from "lucide-react";
import { useAllPartyQuery, useDeletePartyMutation } from "../../../redux/feature/partySlice";
import toast from "react-hot-toast";

export default function Parties() {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eventsPerPage = 10;
  const IMAGE = import.meta.env.VITE_IMAGE_API;

  const { data: allPartiesResponse, isLoading: isAllLoading } = useAllPartyQuery({
    page: currentPage,
    limit: eventsPerPage,
    status: activeTab === "all" ? "" : activeTab,
  });

  const [deleteParty, { isLoading: isDeleting }] = useDeletePartyMutation();

  const paginatedEvents = allPartiesResponse?.data?.data || [];
  const totalPages = allPartiesResponse?.data?.meta?.totalPages || 1;
  const totalData = allPartiesResponse?.data?.meta?.totalData || 0;

  // ── Tab change: reset to page 1, skip if already active ───────────────────
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // ── Go to page: strict guard — no looping, no out-of-range ────────────────
  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
  };

  // ── Modal ──────────────────────────────────────────────────────────────────
  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    document.body.style.overflow = "auto";
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDeleteParty = async (partyId) => {
    if (!window.confirm("Are you sure you want to delete this party?")) return;
    try {
      await deleteParty(partyId).unwrap();
      toast.success("Party deleted successfully");
      closeModal();
    } catch (error) {
      console.error("Failed to delete party:", error);
      alert("Failed to delete party. Please try again.");
    }
  };

  // ── Image resolve ──────────────────────────────────────────────────────────
  const resolveImage = (path) => {
    if (!path) return "/placeholder.svg";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return `${IMAGE}${path}`;
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (isAllLoading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[300px]">
        <div className="text-gray-500 text-lg">Loading events...</div>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="container mx-auto p-4">

      {/* ── Tabs ── */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          {[
            { key: "all",       label: "All Parties" },
            { key: "upcoming",  label: "Upcoming" },
            { key: "completed", label: "Completed" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === key
                  ? "bg-[#E64A19] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-500">{totalData} total</span>
      </div>

      {/* ── Grid ── */}
      {paginatedEvents.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-base">
          No events found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedEvents.map((event) => (
            <div
              key={event._id}
              onClick={() => openModal(event)}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={resolveImage(event?.image)}
                  alt={event?.partyName}
                  className="w-full h-full object-cover p-2 rounded-lg"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-800 truncate">{event.partyName}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">
                    {new Date(event.partyDate).toLocaleDateString()}
                  </span>
                  <span className="font-bold text-[#E64A19]">
                    {event.partyFee > 0 ? `$${event.partyFee}` : "Free"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1.5 shadow-sm">

            {/* Previous — disabled on page 1, never loops */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
                         text-[#E64A19] hover:bg-orange-50
                         disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-transparent
                         transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {/*
              Simple Array.from loop — renders exactly totalPages buttons.
              No ellipsis, no recursion, no infinite loop possible.
            */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[#E64A19] text-white"
                    : "text-gray-700 hover:bg-orange-50"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next — disabled on last page, never loops */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
                         text-[#E64A19] hover:bg-orange-50
                         disabled:text-gray-300 disabled:cursor-not-allowed disabled:hover:bg-transparent
                         transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {isModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleOutsideClick}
        >
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">

            {/* Image */}
            <div className="relative">
              <img
                src={resolveImage(selectedEvent.image)}
                alt={selectedEvent.partyName}
                onError={(e) => { e.target.src = "/placeholder.svg"; }}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            <div className="p-4">

              {/* Title + Delete */}
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-800 flex-1 mr-2">
                  {selectedEvent.partyName}
                </h2>
               
              </div>

              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {selectedEvent.partyDetails}
              </p>

              {/* Info rows */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-2 text-[#E64A19] shrink-0" />
                  <span>
                    {new Date(selectedEvent.partyDate).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-2 text-[#E64A19] shrink-0" />
                  <span>{selectedEvent.partyTimeStart} – {selectedEvent.partyTimeEnd}</span>
                </div>
                <div className="flex items-start text-gray-700">
                  <MapPin className="w-5 h-5 mr-2 text-[#E64A19] shrink-0 mt-0.5" />
                  <span>{selectedEvent.address}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="border-t border-b py-3 my-3 space-y-2">
                {[
                  { label: "Host Earned",   value: `$${selectedEvent.income ?? 0}`,                                    red: true  },
                  { label: "Admin Earned",  value: "$0",                                                                red: true  },
                  { label: "Seat Sold",     value: `${selectedEvent.soldTicket}/${selectedEvent.totalSits}`,             red: false },
                  { label: "Ticket Price",  value: selectedEvent.partyFee > 0 ? `$${selectedEvent.partyFee}` : "Free",  red: true  },
                  { label: "Host",          value: selectedEvent.userId?.name ?? "—",                                   red: false },
                  { label: "Payout Option", value: selectedEvent.payoutOption,                                          red: true  },
                ].map(({ label, value, red }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-500 text-sm">{label}</span>
                    <span className={`font-semibold text-sm ${red ? "text-[#E64A19]" : "text-gray-700"}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Guest list */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium flex items-center text-gray-800 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    Guest List
                    <span className="ml-1 text-gray-400">
                      ({selectedEvent.participants?.length ?? 0})
                    </span>
                  </span>
                  {selectedEvent.participants?.length > 0 && (
                    <button className="text-sm text-[#E64A19] hover:underline">See all</button>
                  )}
                </div>

                {selectedEvent.participants?.length > 0 ? (
                  <div className="flex -space-x-2">
                    {selectedEvent.participants.map((guest) =>
                      guest.image ? (
                        <img
                          key={guest._id}
                          src={resolveImage(guest.image)}
                          alt={guest.name}
                          title={guest.name}
                          onError={(e) => { e.target.src = "/placeholder.svg"; }}
                          className="w-9 h-9 rounded-full border-2 border-white object-cover"
                        />
                      ) : (
                        <div
                          key={guest._id}
                          title={guest.name}
                          className="w-9 h-9 rounded-full border-2 border-white bg-[#E64A19] flex items-center justify-center text-white text-xs font-bold"
                        >
                          {guest.name?.charAt(0).toUpperCase() ?? "?"}
                        </div>
                      )
                    )}
                    {selectedEvent.soldTicket > selectedEvent.participants.length && (
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white text-gray-600">
                        +{selectedEvent.soldTicket - selectedEvent.participants.length}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">No guests yet</p>
                )}
              </div>
 <button
                  onClick={() => handleDeleteParty(selectedEvent._id)}
                  disabled={isDeleting}
                  className="flex items-center justify-center mt-2 text-white gap-1 text-red-500 w-full text-center bg-[#E64A19] hover:bg-red-50 px-2 py-1.5 rounded-lg disabled:opacity-50 transition-colors"
                  title="Delete party"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}