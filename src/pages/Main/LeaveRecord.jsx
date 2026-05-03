import { Table, message } from "antd";
import { useState, useMemo } from "react";
import {
  useGetAllLeaveRecordQuery,
  useUpdateLeaveRecordStatusMutation,
} from "../../redux/feature/shopSlice";

export default function LeaveRecord() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [localStatus, setLocalStatus] = useState({});

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
    </div>
  );
}
