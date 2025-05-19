import { useState } from "react"
import { ChevronLeft, ChevronRight, Globe, MapPin, Calendar, Clock, X, Users } from "lucide-react"

export default function Parties() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Mock event data
  const events = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: "Oxford Road NightsOut",
    date: "21/03",
    price: 50,
    image: "/Parties.png",
    description:
      "Join us for the ultimate nightlife experience! Dance, drink, and celebrate to DJs spinning beats all night long.",
    startDate: "21/03/2023",
    startTime: "09:00pm - 02:00am",
    location: "Yellowstone National Park, Wyoming",
    hostEarned: 500,
    adminEarned: 75,
    seatsSold: 10,
    totalSeats: 40,
    guests: [
      { id: 1, avatar: "/user.png" },
      { id: 2, avatar: "/user.png" },
      { id: 3, avatar: "/user.png" },
      { id: 4, avatar: "/user.png" },
      { id: 5, avatar: "/user.png" },
    ],
  }))

  const openModal = (event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
    // Re-enable scrolling
    document.body.style.overflow = "auto"
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <div className=" ">
      {/* Header with tabs and location */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "upcoming" ? "bg-[#E64A19] text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "completed" ? "bg-[#E64A19] text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>
        <button className="flex items-center bg-[#E64A19] text-white px-4 py-2 rounded-md">
          <Globe className="w-4 h-4 mr-2" />
          USA
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => openModal(event)}
          >
            <div className="h-40 overflow-hidden">
              <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover p-2 rounded-lg" />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-800">{event.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-600">{event.date}</span>
                <span className="font-bold text-[#E64A19]">${event.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

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

          <span className="text-gray-500">...</span>

          <button
            onClick={() => handlePageChange(15)}
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentPage === 15 ? "bg-[#E64A19] text-white" : "text-gray-700"
            }`}
          >
            15
          </button>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 15}
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
                src={selectedEvent.image || "/placeholder.svg"}
                alt={selectedEvent.title}
                className="w-full h-48 object-cover"
              />
              <button onClick={closeModal} className="absolute top-2 right-2 bg-white rounded-full p-1">
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
              <p className="text-gray-600 mb-4">{selectedEvent.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-2 text-[#E64A19]" />
                  <span>{selectedEvent.startDate}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-2 text-[#E64A19]" />
                  <span>{selectedEvent.startTime}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 mr-2 text-[#E64A19]" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-b py-3 my-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Host Earned</span>
                  <span className="font-semibold text-[#E64A19]">${selectedEvent.hostEarned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Admin Earned</span>
                  <span className="font-semibold text-[#E64A19]">${selectedEvent.adminEarned}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seat Sold</span>
                  <span className="font-semibold">
                    {selectedEvent.seatsSold}/{selectedEvent.totalSeats}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Price</span>
                  <span className="font-semibold text-[#E64A19]">${selectedEvent.price}</span>
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
                  {selectedEvent.guests.map((guest) => (
                    <img
                      key={guest.id}
                      src={guest.avatar || "/placeholder.svg"}
                      alt="Guest"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                  {selectedEvent.seatsSold > selectedEvent.guests.length && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium border-2 border-white">
                      +{selectedEvent.seatsSold - selectedEvent.guests.length}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
