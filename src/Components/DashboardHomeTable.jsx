import { Table } from "antd";
import exlamIcon from "../assets/images/exclamation-circle.png";
import { useState } from "react";
import DashboardModal from "./DashboardModal";
import { Search } from "lucide-react";
import { useAllUsersQuery } from "../redux/feature/userSlice";

const DashboardHomeTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch users with pagination parameters
  const { data: users, isLoading } = useAllUsersQuery({
    page: currentPage,
    limit: pageSize,
  });

  // Handle modal display
  const showModal = (data) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  // Define table columns
  const columns = [
    {
      title: "#SI",
      dataIndex: "transIs",
      key: "transIs",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subscription",
      key: "subscription",
      dataIndex: "subscription",
      render: (text) => text || "N/A",
    },
    {
      title: "Action",
      key: "Review",
      align: "center",
      render: (_, data) => (
        <div className="flex items-center justify-around text-center">
          <img
            src={exlamIcon}
            alt="Review"
            className="btn px-3 py-1 text-sm rounded-full cursor-pointer"
            onClick={() => showModal(data)}
          />
        </div>
      ),
    },
  ];

  // Transform and filter API data
  const dataSource =
    users?.data?.result
      ?.map((user, index) => ({
        key: user._id,
        transIs: (currentPage - 1) * pageSize + index + 1, // Adjust serial number for pagination
        name: user.name || "Unknown",
        email: user.email,
        subscription: user.subscription || "N/A",
        phone: user.phone || "N/A",
        date: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "N/A",
        time: user.createdAt
          ? new Date(user.createdAt).toLocaleTimeString("en-US")
          : "N/A",
        amount: user.amount || "N/A",
      }))
      .filter((user) =>
        user.name.toLowerCase().includes(searchText.toLowerCase())
      ) || [];

  // Handle pagination change
  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="rounded-lg border py-4 bg-white mt-8 recent-users-table">
      <div className="flex items-center justify-between p-2">
        <h3 className="text-2xl text-black mb-4 pl-2">Recent Users</h3>
        <div className="flex justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Search by User Name"
            className="border border-[#999999] bg-[#fdece9] px-4 rounded-lg py-2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Search className="bg-[#E73E1E] text-white p-2 size-10 rounded-full" />
        </div>
      </div>
      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          position: ["bottomCenter"],
          current: currentPage,
          pageSize: pageSize,
          total: users?.data?.totalData || 0, // Use totalData from API
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"], // Options for page size
          onChange: handlePaginationChange,
          onShowSizeChange: handlePaginationChange,
        }}
        loading={isLoading}
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
            <p>{modalData.transIs || "N/A"}</p>
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
            <p>{modalData.subscription || "N/A"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Date</p>
            <p>{modalData.date || "N/A"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Time</p>
            <p>{modalData.time || "N/A"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Amount</p>
            <p>{modalData.amount || "N/A"}</p>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default DashboardHomeTable;
