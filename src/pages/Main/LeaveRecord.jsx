import { Table, message } from "antd";
import { useState, useMemo } from "react";
import {
  useGetAllLeaveRecordQuery,
  useUpdateLeaveRecordStatusMutation,
} from "../../redux/feature/shopSlice";
import DashboardModal from "../../Components/DashboardModal";

export default function LeaveRecord() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [localStatus, setLocalStatus] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const { data, isLoading } = useGetAllLeaveRecordQuery({ page: currentPage, limit: pageSize });
  const [updateLeaveRecordStatus, { isLoading: updateLoading }] =
    useUpdateLeaveRecordStatusMutation();

  // API shape: data?.data?.result => array, pagination in data?.data
  const records = data?.data?.result || [];
  const totalData = data?.data?.totalData || 0;

  const dataSource = useMemo(
    () =>
      records.map((record, idx) => ({
        key: record._id,
        index: (currentPage - 1) * pageSize + idx + 1,
        customerName: record.paymentId?.userId?.name || "Unknown",
        customerEmail: record.paymentId?.userId?.email || "-",
        customerPaypal: record.paymentId?.userId?.paypalAccount || "-",
        customerStripe: record.paymentId?.userId?.stripeAccount || "-",
        hostName: record.paymentId?.partyId?.host?.name || "-",
        hostEmail: record.paymentId?.partyId?.host?.email || "-",
        refundAmount: record.refundAmount ?? 0,
        paymentMethod: record.paymentId?.paymentMethod || "-",
        transactionId: record.paymentId?.transactionId || "-",
        refundStatus: record.refundStatus || "PENDING",
        createdAt: record.createdAt
          ? new Date(record.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-",
        raw: record,
      })),
    [records, currentPage, pageSize]
  );

  const handleStatusChange = async (record, value) => {
    // Optimistic UI update
    setLocalStatus((s) => ({ ...s, [record.key]: value }));
    try {
      await updateLeaveRecordStatus({
        id: record.key,
        data: { refundStatus: value },
      }).unwrap();
      message.success(`Status updated to ${value} successfully!`);
    } catch (err) {
      // Rollback on error
      setLocalStatus((s) => ({ ...s, [record.key]: record.refundStatus }));
      message.error("Failed to update status. Please try again.");
      console.error("Failed to update leave record status", err);
    }
  };

  const showModal = (record) => {
    setModalData(record.raw || record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "index",
      key: "index",
      width: 80,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      render: (_, row) => (
        <div>
          <p className="font-medium">{row.customerName}</p>
          <p className="text-sm text-gray-500">{row.customerEmail}</p>
        </div>
      ),
    },
    {
      title: "Host Name",
      dataIndex: "hostName",
      key: "hostName",
      render: (_, row) => (
        <div>
          <p className="font-medium">{row.hostName}</p>
          <p className="text-sm text-gray-500">{row.hostEmail}</p>
        </div>
      ),
    },
    {
      title: "Refund Amount",
      dataIndex: "refundAmount",
      key: "refundAmount",
      align: "center",
      render: (val) =>
        `£${Number(val).toLocaleString(undefined, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })}`,
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      align: "center",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text) => (
        <span className="text-xs text-gray-600" title={text}>
          {text?.substring(0, 20)}...
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
    },
    {
      title: "Status",
      key: "status",
      align: "center",
      render: (_, record) => {
        const status = localStatus[record.key] ?? record.refundStatus;
        return (
          <div className="flex items-center justify-center">
            <select
              value={status}
              onChange={(e) => handleStatusChange(record, e.target.value)}
              className={`py-1 px-3 rounded-md text-sm font-medium transition-colors ${
                status === "PAID"
                  ? "bg-[#FEEAEA] text-[#C33]"
                  : status === "PENDING"
                    ? "bg-[#FFF3CD] text-[#856404]"
                    : "bg-[#E7533A] text-white"
              }`}
              disabled={updateLoading}
            >
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              {/* <option value="REJECTED">Rejected</option> */}
            </select>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, row) => (
        <div className="flex items-center justify-center">
          <button
            onClick={() => showModal(row)}
            className="bg-[#E7533A] text-white px-3 py-1 rounded-md text-sm"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-lg border py-4 bg-white mt-8 px-4">
      <h3 className="text-2xl text-black mb-4 pl-2">Leave Records / Refunds</h3>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowClassName={(record) =>
          localStatus[record.key] === "PAID" ? "bg-[#fde7e6]" : ""
        }
        pagination={{
          position: ["bottomCenter"],
          current: currentPage,
          pageSize: pageSize,
          total: totalData,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
        }}
        loading={isLoading}
      />
      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="600px"
      >
        <div>
          <h2 className="text-lg text-center mb-4">Refund Details</h2>
          <div className="mb-2 text-gray-600">
            <p className="font-medium">Customer</p>
            <p>{modalData.paymentId?.userId?.name || "-"} — {modalData.paymentId?.userId?.email || "-"}</p>
            <p className="text-sm text-gray-500">PayPal: {modalData.paymentId?.userId?.paypalAccount || "-"}</p>
            <p className="text-sm text-gray-500">Stripe: {modalData.paymentId?.userId?.stripeAccount || "-"}</p>
          </div>
          <div className="mb-2 text-gray-600">
            <p className="font-medium">Host</p>
            <p>{modalData.paymentId?.partyId?.host?.name || "-"} — {modalData.paymentId?.partyId?.host?.email || "-"}</p>
          </div>
          <div className="mb-2 text-gray-600">
            <p className="font-medium">Transaction</p>
            <p>{modalData.paymentId?.transactionId || "-"}</p>
          </div>
          <div className="mb-2 text-gray-600">
            <p className="font-medium">Payment Method</p>
            <p>{modalData.paymentId?.paymentMethod || "-"}</p>
          </div>
          <div className="mb-2 text-gray-600">
            <p className="font-medium">Refund Amount</p>
            <p>£{Number(modalData.refundAmount || 0).toLocaleString()}</p>
          </div>
          <div className="mb-2 text-gray-600">
            <p className="font-medium">Status</p>
            <p>{modalData.refundStatus || "-"}</p>
          </div>
          <div className="mb-2 text-gray-600">
            <p className="font-medium">Created At</p>
            <p>{modalData.createdAt ? new Date(modalData.createdAt).toLocaleString() : "-"}</p>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
}
