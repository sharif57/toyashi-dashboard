import { Table } from "antd";
import exlamIcon from "../assets/images/exclamation-circle.png";
import { useState } from "react";
import DashboardModal from "./DashboardModal";
import { Search } from "lucide-react";
import { useTotalHostQuery } from "../redux/feature/userSlice";
import { format } from "date-fns"; // For date formatting

const HostsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const pageSize = 10; // Matches API default limit

  // Fetch hosts with pagination
  const { data: hostsResponse, isLoading } = useTotalHostQuery({
    page: currentPage,
    limit: pageSize,
  });

  // Extract hosts and pagination meta
  const hosts = hostsResponse?.data?.result || [];
  // const totalPages = hostsResponse?.data?.meta?.totalPage || 1;
  const totalItems = hostsResponse?.data?.meta?.total || 0;

  // Filter data based on search term
  const filteredHosts = hosts.filter((host) =>
    host.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    host.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text) => text || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => text || "N/A",
    },
    // {
    //   title: "Subscription",
    //   key: "subscription",
    //   dataIndex: "subscription",
    //   render: () => "N/A", // Placeholder; update if subscription data is available
    // },
    {
      title: "Action",
      key: "Review",
      align: "center",
      render: (_, data) => (
        <div className="flex items-center justify-center">
          <img
            src={exlamIcon}
            alt="Review"
            className="px-3 py-1 text-sm rounded-full cursor-pointer"
            onClick={() => showModal(data)}
          />
        </div>
      ),
    },
  ];

  // Map filtered API data to table dataSource
  const dataSource = filteredHosts.map((host) => ({
    key: host._id,
    _id: host._id,
    name: host.name,
    email: host.email,
    subscription: host.subscription, // Placeholder; update if available
    phone: host.phone || "N/A",
    createdAt: host.createdAt,
  }));

  return (
    <div className="rounded-lg border py-4 bg-white mt-8 recent-users-table">
      <div className="flex items-center justify-between p-2">
        <h3 className="text-2xl text-black mb-4 pl-2">Hosts</h3>
        <div className="flex justify-center items-center gap-4">
          <input
            type="text"
            placeholder="User Name"
            className="border border-[#999999] bg-[#fdece9] px-4 rounded-lg py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="bg-[#E73E1E] text-white p-2 size-10 rounded-full cursor-pointer"
            onClick={() => setSearchTerm(searchTerm)} // Optional: Trigger search on icon click
          />
        </div>
      </div>
      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        pagination={{
          position: ["bottomCenter"],
          current: currentPage,
          pageSize: pageSize,
          total: totalItems,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: false, // Disable page size changer for simplicity
        }}
        className="rounded-lg"
      />
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="500px"
      >
        <div>
          <h2 className="text-lg text-center mb-4">User Details</h2>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>#SL</p>
            <p>
              {(currentPage - 1) * pageSize +
                dataSource.findIndex((d) => d._id === modalData._id) +
                1 || "N/A"}
            </p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>User Name</p>
            <p>{modalData.name || "N/A"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Email</p>
            <p>{modalData.email || "N/A"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Mobile Phone</p>
            <p>{modalData.phone || "N/A"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Service</p>
            <p>Hosting</p> {/* Placeholder; update if specific service data is available */}
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Date</p>
            <p>
              {modalData.createdAt
                ? format(new Date(modalData.createdAt), "dd MMM yyyy")
                : "N/A"}
            </p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Time</p>
            <p>
              {modalData.createdAt
                ? format(new Date(modalData.createdAt), "hh:mm a")
                : "N/A"}
            </p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Amount</p>
            <p>N/A</p> {/* Placeholder; update if amount data is available */}
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default HostsTable;