import { Table } from "antd";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import { useState } from "react";
import DashboardModal from "../../../Components/DashboardModal";
import { useAllPaymentsQuery } from "../../../redux/feature/paymentSlice";
import { format } from "date-fns"; // For date/time formatting

const Transaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Matches API default limit

  // Fetch payments with pagination
  const { data: allPayments, isLoading } = useAllPaymentsQuery({
    page: currentPage,
    limit: pageSize,
  });

  // Extract payments and pagination meta
  const payments = allPayments?.data?.data || [];
  // const totalPages = allPayments?.data?.meta?.totalPages || 1;
  const totalItems = allPayments?.data?.meta?.totalData || 0;

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text) => <a>{text.slice(0, 8)}</a>, // Shorten transactionId for display
    },
    {
      title: "User",
      dataIndex: ["userId", "name"],
      key: "name",
      render: (text) => text || "N/A",
    },
    {
      title: "Party Name",
      dataIndex: "partyId",
      key: "partyId",
      render: (partyId) => partyId?._id || "N/A", // Placeholder; update if partyName is available
    },
    {
      title: "Payment",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount}`,
    },
    // {
    //   title: "Earnings",
    //   key: "earnings",
    //   render: () => "$0", // Placeholder; update with actual earnings logic if available
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
            className="btn px-3 py-1 text-sm rounded-full cursor-pointer"
            onClick={() => showModal(data)}
          />
        </div>
      ),
    },
  ];

  // Map API data to table dataSource
  const dataSource = payments.map((payment) => ({
    key: payment._id,
    transactionId: payment.transactionId,
    userId: payment.userId,
    partyId: payment.partyId,
    amount: payment.amount,
    status: payment.status,
    createdAt: payment.createdAt,
  }));

  return (
    <div className="rounded-lg border py-4 bg-white mt-8 recent-users-table">
      <h3 className="text-2xl text-black mb-4 pl-2">Transaction</h3>
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
          <h2 className="text-lg text-center mb-4">Transaction Details</h2>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Transaction ID</p>
            <p>{modalData.transactionId}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>User Name</p>
            <p>{modalData.userId?.name || "N/A"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Email</p>
            <p>{modalData.userId?.email || "N/A"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Mobile Phone</p>
            <p>{modalData.userId?.phone || "N/A"}</p> {/* Update if phone is available */}
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Service</p>
            <p>{modalData.partyId?._id || "N/A"}</p> {/* Update with partyName if available */}
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
            <p>${modalData.amount || "0"}</p>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <p>Status</p>
            <p>{modalData.status || "N/A"}</p>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Transaction;