import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

export default function HostRequest() {
  const users = [
    {
      id: 1,
      name: "Cameron Williamson",
      avatar: "/use3.png",
      documents: [
        { name: "Passport.pdf", approved: true },
        { name: "License.pdf", approved: true },
      ],
    },
    {
      id: 2,
      name: "Darlene Robertson",
      avatar: "/use3.png",
      documents: [
        { name: "Passport.pdf", approved: true },
        { name: "License.pdf", approved: true },
      ],
    },
    {
      id: 3,
      name: "Jane Cooper",
      avatar: "/use3.png",
      documents: [
        { name: "Passport.pdf", approved: true },
        { name: "License.pdf", approved: true },
      ],
    },
    {
      id: 4,
      name: "Theresa Webb",
      avatar: "/use3.png",
      documents: [
        { name: "Passport.pdf", approved: true },
        { name: "License.pdf", approved: true },
      ],
    },
    {
      id: 5,
      name: "Kathryn Murphy",
      avatar: "/use3.png",
      documents: [
        { name: "Passport.pdf", approved: true },
        { name: "License.pdf", approved: true },
      ],
    },
    {
      id: 6,
      name: "Albert Flores",
      avatar: "/use3.png",
      documents: [
        { name: "Passport.pdf", approved: true },
        { name: "License.pdf", approved: true },
      ],
    },
    {
      id: 7,
      name: "Cameron Williamson",
      avatar: "/use3.png",
      documents: [
        { name: "Passport.pdf", approved: true },
        { name: "License.pdf", approved: true },
      ],
    },
    {
      id: 8,
      name: "Arlene McCoy",
      avatar: "/use3.png",
      documents: [
        { name: "Passport.pdf", approved: true },
        { name: "License.pdf", approved: true },
      ],
    },
  ];

  const handleDelete = () => {
    toast.success("delete successfully ");
  };

  const handleApproved = () => {
    toast.success("Approved successfully ");
  };

  return (
    <div className="   pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg p-6 flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
              <img
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
            <p className="text-sm  text-gray-500 mb-4 ">Documents</p>
            <div className="flex justify-center gap-4 w-full mb-4">
              {user.documents.map((doc, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#FF8973] flex items-center justify-center mb-1">
                    <img src="/pdf.png" alt="" className="p-3" />
                  </div>
                  <span className="text-xs text-gray-600">{doc.name}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 w-full">
              <button onClick={handleApproved} className="flex-1 bg-[#E94A35] rounded-full text-white py-2  text-sm font-medium hover:bg-[#D43A25] transition-colors">
                Approved
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 border border-[#E94A35] text-gray-700 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 gap-2">
        <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors">
          1
        </button>

        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors">
          ...
        </button>

        <button className="w-8 h-8 flex items-center justify-center border-none rounded-md bg-[#E94A35] text-white hover:bg-[#D43A25] transition-colors">
          12
        </button>

        <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors">
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
