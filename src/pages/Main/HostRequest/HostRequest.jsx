/* eslint-disable react/prop-types */
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import toast from "react-hot-toast";
// import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
// import 'react-tabs/style/react-tabs.css';

// export default function HostRequest() {
//   const users = [
//     {
//       id: 1,
//       name: "Cameron Williamson",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: true },
//         { name: "License.pdf", approved: true },
//       ],
//     },
//     {
//       id: 2,
//       name: "Darlene Robertson",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: true },
//         { name: "License.pdf", approved: true },
//       ],
//     },
//     {
//       id: 3,
//       name: "Jane Cooper",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: true },
//         { name: "License.pdf", approved: true },
//       ],
//     },
//     {
//       id: 4,
//       name: "Theresa Webb",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: true },
//         { name: "License.pdf", approved: true },
//       ],
//     },
//     {
//       id: 5,
//       name: "Kathryn Murphy",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: true },
//         { name: "License.pdf", approved: true },
//       ],
//     },
//     {
//       id: 6,
//       name: "Albert Flores",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: true },
//         { name: "License.pdf", approved: true },
//       ],
//     },
//     {
//       id: 7,
//       name: "Cameron Williamson",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: true },
//         { name: "License.pdf", approved: true },
//       ],
//     },
//     {
//       id: 8,
//       name: "Arlene McCoy",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: true },
//         { name: "License.pdf", approved: true },
//       ],
//     },
//   ];

//   const handleDelete = () => {
//     toast.success("delete successfully ");
//   };

//   const handleApproved = () => {
//     toast.success("Approved successfully ");
//   };

//   return (
//     <div className="   pt-4">
//       <Tabs>
//         <TabList>
//           <Tab></Tab>
//           <Tab>Title 2</Tab>
//           <Tab>Title 3</Tab>
//         </TabList>

//         <TabPanel>
//           <h2>Any content 1</h2>
//         </TabPanel>
//         <TabPanel>
//           <h2>Any content 2</h2>
//         </TabPanel>
//         <TabPanel>
//           <h2>Any content 2</h2>
//         </TabPanel>
//       </Tabs>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             className="bg-white rounded-lg p-6 flex flex-col items-center"
//           >
//             <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
//               <img
//                 src={user.avatar || "/placeholder.svg"}
//                 alt={user.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
//             <p className="text-sm  text-gray-500 mb-4 ">Documents</p>
//             <div className="flex justify-center gap-4 w-full mb-4">
//               {user.documents.map((doc, index) => (
//                 <div key={index} className="flex flex-col items-center">
//                   <div className="w-14 h-14 rounded-full bg-[#FF8973] flex items-center justify-center mb-1">
//                     <img src="/pdf.png" alt="" className="p-3" />
//                   </div>
//                   <span className="text-xs text-gray-600">{doc.name}</span>
//                 </div>
//               ))}
//             </div>

//             <div className="flex gap-2 w-full">
//               <button
//                 onClick={handleApproved}
//                 className="flex-1 bg-[#E94A35] rounded-full text-white py-2  text-sm font-medium hover:bg-[#D43A25] transition-colors"
//               >
//                 Approved
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="flex-1 border border-[#E94A35] text-gray-700 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center items-center mt-8 gap-2">
//         <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors">
//           <ChevronLeft className="w-4 h-4 mr-1" />
//           Previous
//         </button>

//         <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors">
//           1
//         </button>

//         <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors">
//           ...
//         </button>

//         <button className="w-8 h-8 flex items-center justify-center border-none rounded-md bg-[#E94A35] text-white hover:bg-[#D43A25] transition-colors">
//           12
//         </button>

//         <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors">
//           Next
//           <ChevronRight className="w-4 h-4 ml-1" />
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
// import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
// import "react-tabs/style/react-tabs.css";
// import toast from "react-hot-toast";
// import {
//   useAllHostQuery,
//   useAllHostRequestQuery,
//   useAllRejectedHostQuery,
// } from "../../../redux/feature/hostSlice";

// export default function HostRequest() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;
//   const { data } = useAllHostRequestQuery();
//   const { data: allHosts } = useAllHostQuery();
//   const { data: rejectedHosts } = useAllRejectedHostQuery();

//   // Sample data for different tabs
//   const allRequests = [
//     {
//       id: 1,
//       name: "Cameron Williamson",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: false },
//         { name: "License.pdf", approved: false },
//       ],
//       status: "pending",
//     },
//     {
//       id: 2,
//       name: "Darlene Robertson",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: false },
//         { name: "License.pdf", approved: false },
//       ],
//       status: "pending",
//     },
//     // More users...
//     {
//       id: 3,
//       name: "Jane Cooper",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: false },
//         { name: "License.pdf", approved: false },
//       ],
//       status: "pending",
//     },
//     {
//       id: 4,
//       name: "Theresa Webb",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: false },
//         { name: "License.pdf", approved: false },
//       ],
//       status: "pending",
//     },
//     {
//       id: 5,
//       name: "Kathryn Murphy",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: false },
//         { name: "License.pdf", approved: false },
//       ],
//       status: "pending",
//     },
//     {
//       id: 6,
//       name: "Albert Flores",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: false },
//         { name: "License.pdf", approved: false },
//       ],
//       status: "pending",
//     },
//     {
//       id: 7,
//       name: "Cameron Williamson",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: false },
//         { name: "License.pdf", approved: false },
//       ],
//       status: "pending",
//     },
//     {
//       id: 8,
//       name: "Arlene McCoy",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: false },
//         { name: "License.pdf", approved: false },
//       ],
//       status: "pending",
//     },
//   ];

//   const allHosts = [
//     {
//       id: 9,
//       name: "Leslie Alexander",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: true },
//         { name: "License.pdf", approved: true },
//       ],
//       status: "approved",
//     },
//     {
//       id: 10,
//       name: "Guy Hawkins",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: true },
//         { name: "License.pdf", approved: true },
//       ],
//       status: "approved",
//     },
//     // More approved hosts...
//   ];

//   const rejectedHosts = [
//     {
//       id: 11,
//       name: "Esther Howard",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: false },
//         { name: "License.pdf", approved: false },
//       ],
//       status: "rejected",
//     },
//     {
//       id: 12,
//       name: "Brooklyn Simmons",
//       avatar: "/use3.png",
//       documents: [
//         { name: "Passport.pdf", approved: false },
//         { name: "License.pdf", approved: false },
//       ],
//       status: "rejected",
//     },
//     // More rejected hosts...
//   ];

//   // Get data based on active tab
//   const getActiveData = () => {
//     switch (activeTab) {
//       case 0:
//         return allRequests;
//       case 1:
//         return allHosts;
//       case 2:
//         return rejectedHosts;
//       default:
//         return allRequests;
//     }
//   };

//   // Pagination logic
//   const activeData = getActiveData();
//   const totalPages = Math.ceil(activeData.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentData = activeData.slice(startIndex, endIndex);

//   const handleApproved = (userId) => {
//     toast.success("Host approved successfully");
//     // Here you would typically update the state or make an API call
//   };

//   const handleDelete = (userId) => {
//     toast.success("Host deleted successfully");
//     // Here you would typically update the state or make an API call
//   };

//   const handleTabChange = (index) => {
//     setActiveTab(index);
//     setCurrentPage(1); // Reset to first page when changing tabs
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="pt-4">
//       <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
//         <TabList className="flex border-b mb-6">
//           <Tab className="px-4 py-2 cursor-pointer focus:outline-none border-b-2 border-transparent data-[selected]:border-[#E94A35] data-[selected]:text-[#E94A35] font-medium">
//             all host request(by admin)
//           </Tab>
//           <Tab className="px-4 py-2 cursor-pointer focus:outline-none border-b-2 border-transparent data-[selected]:border-[#E94A35] data-[selected]:text-[#E94A35] font-medium">
//             all host (by admin)
//           </Tab>
//           <Tab className="px-4 py-2 cursor-pointer focus:outline-none border-b-2 border-transparent data-[selected]:border-[#E94A35] data-[selected]:text-[#E94A35] font-medium">
//             all rejected host(by admin)
//           </Tab>
//         </TabList>

//         <TabPanel>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {currentData.map((user) => (
//               <UserCard
//                 key={user.id}
//                 user={user}
//                 onApprove={() => handleApproved(user.id)}
//                 onDelete={() => handleDelete(user.id)}
//               />
//             ))}
//           </div>
//         </TabPanel>

//         <TabPanel>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {currentData.map((user) => (
//               <UserCard
//                 key={user.id}
//                 user={user}
//                 onApprove={() => handleApproved(user.id)}
//                 onDelete={() => handleDelete(user.id)}
//                 showApproveButton={false}
//               />
//             ))}
//           </div>
//         </TabPanel>

//         <TabPanel>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {currentData.map((user) => (
//               <UserCard
//                 key={user.id}
//                 user={user}
//                 onApprove={() => handleApproved(user.id)}
//                 onDelete={() => handleDelete(user.id)}
//               />
//             ))}
//           </div>
//         </TabPanel>
//       </Tabs>

//       {activeData.length > itemsPerPage && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       )}
//     </div>
//   );
// }

// function UserCard({ user, onApprove, onDelete, showApproveButton = true }) {
//   return (
//     <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-sm border border-gray-100">
//       <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
//         <img
//           src={user.avatar || "/placeholder.svg"}
//           alt={user.name}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
//       <p className="text-sm text-gray-500 mb-4">Documents</p>
//       <div className="flex justify-center gap-4 w-full mb-4">
//         {user.documents.map((doc, index) => (
//           <div key={index} className="flex flex-col items-center">
//             <div className="w-14 h-14 rounded-full bg-[#FF8973] flex items-center justify-center mb-1">
//               <FileText className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-xs text-gray-600">{doc.name}</span>
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-2 w-full">
//         {showApproveButton && (
//           <button
//             onClick={onApprove}
//             className="flex-1 bg-[#E94A35] hover:bg-[#D43A25] text-white py-2 rounded-full text-sm font-medium transition-colors"
//           >
//             Approve
//           </button>
//         )}
//         <button
//           onClick={onDelete}
//           className="flex-1 border border-[#E94A35] text-gray-700 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
//         >
//           Deny
//         </button>
//       </div>
//     </div>
//   );
// }

// function Pagination({ currentPage, totalPages, onPageChange }) {
//   // Generate page numbers to display
//   const getPageNumbers = () => {
//     if (totalPages <= 5) {
//       return Array.from({ length: totalPages }, (_, i) => i + 1);
//     }

//     if (currentPage <= 3) {
//       return [1, 2, 3, "...", totalPages];
//     }

//     if (currentPage >= totalPages - 2) {
//       return [1, "...", totalPages - 2, totalPages - 1, totalPages];
//     }

//     return [
//       1,
//       "...",
//       currentPage - 1,
//       currentPage,
//       currentPage + 1,
//       "...",
//       totalPages,
//     ];
//   };

//   const pageNumbers = getPageNumbers();

//   return (
//     <div className="flex justify-center items-center mt-8 gap-2">
//       <button
//         onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//         disabled={currentPage === 1}
//         className={`flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors ${
//           currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//       >
//         <ChevronLeft className="w-4 h-4 mr-1" />
//         Previous
//       </button>

//       {pageNumbers.map((page, index) => (
//         <button
//           key={index}
//           onClick={() => typeof page === "number" && onPageChange(page)}
//           disabled={typeof page !== "number"}
//           className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
//             currentPage === page
//               ? "bg-[#E94A35] text-white hover:bg-[#D43A25] border-none"
//               : "bg-white hover:bg-gray-50 border border-gray-300"
//           } ${typeof page !== "number" ? "cursor-default" : ""}`}
//         >
//           {page}
//         </button>
//       ))}

//       <button
//         onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//         disabled={currentPage === totalPages}
//         className={`flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors ${
//           currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//       >
//         Next
//         <ChevronRight className="w-4 h-4 ml-1" />
//       </button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import toast from "react-hot-toast";
import {
  useAllHostQuery,
  useAllHostRequestQuery,
  useAllRejectedHostQuery,
  useRequestApprovalMutation,
  useRequestRejectMutation,
} from "../../../redux/feature/hostSlice";

export default function HostRequest() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const IMAGE = import.meta.env.VITE_IMAGE_API;

  // Fetch data from API
  const { data: hostRequestsData } = useAllHostRequestQuery();
  const { data: allHostsData } = useAllHostQuery();
  const { data: rejectedHostsData } = useAllRejectedHostQuery();
  const [requestApproval] = useRequestApprovalMutation();
  const [requestReject] = useRequestRejectMutation();
  // const IMAGE = import.meta.env.VITE_IMAGE_API;

  // Transform API data to match the required format
  const transformData = (apiData) => {
    if (!apiData?.data?.result) return [];
    return apiData.data.result.map((item) => ({
      id: item._id,
      name: item.name || "Unknown User",
      avatar: item.image || "/placeholder.svg",
      documents: [
        {
          name: item.passport.split("/").pop(),
          approved: item.hostRequest === "APPROVED",
        },
        {
          name: item.residential.split("/").pop(),
          approved: item.hostRequest === "APPROVED",
        },
      ],
      status: item.hostRequest.toLowerCase(),
    }));
  };

  const allRequests = transformData(hostRequestsData);
  const allHosts = transformData(allHostsData);
  const rejectedHosts = transformData(rejectedHostsData);

  // Get data based on active tab
  const getActiveData = () => {
    switch (activeTab) {
      case 0:
        return allRequests;
      case 1:
        return allHosts;
      case 2:
        return rejectedHosts;
      default:
        return allRequests;
    }
  };

  // Pagination logic
  const activeData = getActiveData();
  const totalPages = Math.ceil(activeData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = activeData.slice(startIndex, endIndex);

  const handleApproved = async (userId) => {
    console.log("userId", userId);
    try {
      const response = await requestApproval(userId);
      console.log("response", response);
      toast.success("Host approved successfully");
    } catch (error) {
      toast.error("Failed to approve host");
    }
  };

  const handleDelete = async (userId) => {
    const response = await requestReject(userId);
    console.log("response", response);
    toast.success(response?.message ||"Host deleted successfully");
    // Add API call to update host request status to REJECTED or delete
    // Example: await updateHostRequestStatus(userId, "REJECTED");
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // console.log("IMAGE", IMAGE);

  return (
    <div className="pt-4">
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <TabList className="flex border-b mb-6">
          <Tab className="px-4 py-2 cursor-pointer focus:outline-none border-b-2 border-transparent data-[selected]:border-[#E94A35] data-[selected]:text-[#E94A35] font-medium">
            All Host Requests
          </Tab>
          <Tab className="px-4 py-2 cursor-pointer focus:outline-none border-b-2 border-transparent data-[selected]:border-[#E94A35] data-[selected]:text-[#E94A35] font-medium">
            All Hosts
          </Tab>
          <Tab className="px-4 py-2 cursor-pointer focus:outline-none border-b-2 border-transparent data-[selected]:border-[#E94A35] data-[selected]:text-[#E94A35] font-medium">
            All Rejected Hosts
          </Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentData.length > 0 ? (
              currentData.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onApprove={() => handleApproved(user.id)}
                  onDelete={() => handleDelete(user.id)}
                />
              ))
            ) : (
              <p className="text-center col-span-4 text-gray-500">
                No host requests found.
              </p>
            )}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentData.length > 0 ? (
              currentData.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onApprove={() => handleApproved(user.id)}
                  onDelete={() => handleDelete(user.id)}
                  showApproveButton={false}
                />
              ))
            ) : (
              <p className="text-center col-span-4 text-gray-500">
                No approved hosts found.
              </p>
            )}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentData.length > 0 ? (
              currentData.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onApprove={() => handleApproved(user.id)}
                  onDelete={() => handleDelete(user.id)}
                />
              ))
            ) : (
              <p className="text-center col-span-4 text-gray-500">
                No rejected hosts found.
              </p>
            )}
          </div>
        </TabPanel>
      </Tabs>

      {activeData.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

function UserCard({ user, onApprove, onDelete, showApproveButton = true }) {
  const IMAGE = import.meta.env.VITE_IMAGE_API;
  return (
    <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-sm border border-gray-100">
      <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
        <img
          src={`${IMAGE}/${user.avatar}`}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
      <p className="text-sm text-gray-500 mb-4">Documents</p>
      <div className="flex justify-center gap-4 w-full mb-4">
        {user.documents.map((doc, index) => (
          <div key={index} className="flex flex-col items-center">
            <a
              href={`${IMAGE}/docs/${doc.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-14 h-14 rounded-full bg-[#FF8973] flex items-center justify-center mb-1">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-600">{doc.name}</span>
            </a>
          </div>
        ))}
      </div>

      <div className="flex gap-2 w-full">
        {showApproveButton && (
          <button
            onClick={onApprove}
            className="flex-1 bg-[#E94A35] hover:bg-[#D43A25] text-white py-2 rounded-full text-sm font-medium transition-colors"
          >
            Approve
          </button>
        )}
        <button
          onClick={onDelete}
          className="flex-1 border border-[#E94A35] text-gray-700 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Deny
        </button>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center mt-8 gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>

      {pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={typeof page !== "number"}
          className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
            currentPage === page
              ? "bg-[#E94A35] text-white hover:bg-[#D43A25] border-none"
              : "bg-white hover:bg-gray-50 border border-gray-300"
          } ${typeof page !== "number" ? "cursor-default" : ""}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}
