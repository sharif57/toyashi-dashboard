
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  X,
  Users,
} from "lucide-react";
import { useAllPartyQuery, usePastPartyQuery, useUpComingPartyQuery } from "../../../redux/feature/partySlice";

export default function Parties() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination settings
  const eventsPerPage = 10; // Matches the default limit in the API slice

  // Fetch data for all parties, upcoming parties, and past parties with pagination
  const { data: allParties, isLoading: isAllLoading } = useAllPartyQuery({
    page: currentPage,
    limit: eventsPerPage,
  });
  const { data: upcomingParties, isLoading: isUpcomingLoading } = useUpComingPartyQuery({
    page: currentPage,
    limit: eventsPerPage,
  });
  const { data: pastParties, isLoading: isPastLoading } = usePastPartyQuery({
    page: currentPage,
    limit: eventsPerPage,
  });

  // Determine which events to display based on active tab
  const eventsData =
    activeTab === "upcoming" ? upcomingParties : activeTab === "completed" ? pastParties : allParties;

  // Extract events and total pages from API response
  const events = eventsData?.data?.data || [];
  const totalPages = eventsData?.data?.totalPages || 1; // Adjust based on API response structure

  // Calculate paginated events (handled by API, but kept for client-side consistency)
  const paginatedEvents = events;

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Loading state
  if (isAllLoading || isPastLoading || isUpcomingLoading) {
    return <div className="container mx-auto p-4">Loading events...</div>;
  }
    const IMAGE = import.meta.env.VITE_IMAGE_API;


  return (
    <div className="container mx-auto p-4">
      {/* Header with tabs and location */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
            <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "all"
                ? "bg-[#E64A19] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => {
              setActiveTab("all");
              setCurrentPage(1); // Reset page when switching tabs
            }}
          >
            All Parties
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "upcoming"
                ? "bg-[#E64A19] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => {
              setActiveTab("upcoming");
              setCurrentPage(1); // Reset page when switching tabs
            }}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "completed"
                ? "bg-[#E64A19] text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => {
              setActiveTab("completed");
              setCurrentPage(1); // Reset page when switching tabs
            }}
          >
            Completed
          </button>
        
        </div>
        {/* <button className="flex items-center bg-[#E64A19] text-white px-4 py-2 rounded-md">
          <Globe className="w-4 h-4 mr-2" />
          USA
        </button> */}
      </div>

      {/* Events Grid */}
      {paginatedEvents.length === 0 ? (
        <div>No {activeTab} events found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => openModal(event)}
            >
              <div className="h-40 overflow-hidden">
                <img
                src={`${IMAGE}/${event.image}` || "/placeholder.svg"}
                  alt={event.partyName}
                  className="w-full h-full object-cover p-2 rounded-lg"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-800">{event.partyName}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">{event.partyDate}</span>
                  <span className="font-bold text-[#E64A19]">${event.partyFee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center space-x-2 bg-white rounded-full px-2 py-1 shadow-sm">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center p-2 rounded-full text-[#E64A19] disabled:text-gray-300"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={() => handlePageChange(1)}
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentPage === 1 ? "bg-[#E64A19] text-white" : "text-gray-700"
            }`}
          >
            1
          </button>

          {totalPages > 1 && (
            <>
              {totalPages > 2 && <span className="text-gray-500">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentPage === totalPages ? "bg-[#E64A19] text-white" : "text-gray-700"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center p-2 rounded-full text-[#E64A19] disabled:text-gray-300"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Event Modal */}
      {isModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleOutsideClick}
        >
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header with Image */}
            <div className="relative">
              <img
                src={`${IMAGE}/${selectedEvent.image}` || "/placeholder.svg"}
                alt={selectedEvent.partyName}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-white rounded-full p-1"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{selectedEvent.partyName}</h2>
              <p className="text-gray-600 mb-4">{selectedEvent.partyDetails}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-2 text-[#E64A19]" />
                  <span>{selectedEvent.partyDate}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-2 text-[#E64A19]" />
                  <span>
                    {selectedEvent.partyTimeStart} - {selectedEvent.partyTimeEnd}
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-2 text-[#E64A19]" />
                  <span>{selectedEvent.address}</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-b py-3 my-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Host Earned</span>
                  <span className="font-semibold text-[#E64A19]">
                    ${selectedEvent.income || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Admin Earned</span>
                  <span className="font-semibold text-[#E64A19]">$0</span> {/* Adjust if API provides */}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seat Sold</span>
                  <span className="font-semibold">
                    {selectedEvent.soldTicket}/{selectedEvent.totalSits}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Price</span>
                  <span className="font-semibold text-[#E64A19]">
                    ${selectedEvent.partyFee}
                  </span>
                </div>
              </div>

              {/* Guest List */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium flex items-center">
                    <Users className="w-4 h-4 mr-1" /> Guest List
                  </span>
                  <button className="text-sm text-[#E64A19]">See all</button>
                </div>
                <div className="flex -space-x-2">
                  {selectedEvent.participants.map((guest) => (
                    <img
                      key={guest._id}
                      src={`${IMAGE}/${guest.image}` || "/placeholder.svg"}
                      alt={guest.name}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                  {selectedEvent.soldTicket > selectedEvent.participants.length && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
                      +{selectedEvent.soldTicket - selectedEvent.participants.length}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}