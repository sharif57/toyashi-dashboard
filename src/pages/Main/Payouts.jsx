import { Table, message } from "antd";
import { useState, useMemo } from "react";
import {
  useAllPayoutsQuery,
  useUpdatePayoutMutation,
} from "../../redux/feature/shopSlice";

export default function Payouts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [localPaid, setLocalPaid] = useState({});

  const { data, isLoading } = useAllPayoutsQuery({ page: currentPage, limit: pageSize });
  const [updatePayout, { isLoading: updateLoading }] = useUpdatePayoutMutation();

  // API shape: data?.data?.data => array, data?.data?.meta => pagination
  const payouts = data?.data?.data || [];
  const meta = data?.data?.meta || {};

  const dataSource = useMemo(
    () =>
      payouts.map((p, idx) => ({
        key: p._id,
        index: (currentPage - 1) * pageSize + idx + 1,
        hostName: p.userId?.name || p.userId?.email || "Unknown",
        partyName: p.partyName || "-",
        partyDate: p.partyDate
          ? new Date(p.partyDate).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-",
        ticketsSold: p.soldTicket ?? 0,
        payableAmount: p.income ?? 0,
        payoutMethod: p.payoutOption || (p.paypalAccount ? "PAYPAL" : "STRIPE") || "-",
        payoutEmail: p.paypalAccount || p.userId?.paypalAccount || "-",
        raw: p,
      })),
    [payouts, currentPage, pageSize]
  );

  const handleStatusChange = async (record, value) => {
    // Optimistic UI update
    setLocalPaid((s) => ({ ...s, [record.key]: value === "Paid" }));
    try {
      await updatePayout({ id: record.key, data: { payoutStatus: value === "Paid" ? "PAID" : "UNPAID" } }).unwrap();
      message.success(`Payout status updated to ${value} successfully!`);
    } catch (err) {
      // rollback on error
      setLocalPaid((s) => ({ ...s, [record.key]: record._isPaid || false }));
      message.error("Failed to update payout status. Please try again.");
      console.error("Failed to update payout status", err);
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
      title: "Host Name",
      dataIndex: "hostName",
      key: "hostName",
    },
    {
      title: "Party Name",
      dataIndex: "partyName",
      key: "partyName",
    },
    {
      title: "Party Date",
      dataIndex: "partyDate",
      key: "partyDate",
      align: "center",
    },
    {
      title: "Tickets Sold",
      dataIndex: "ticketsSold",
      key: "ticketsSold",
      align: "center",
    },
    {
      title: "Payable Amount",
      dataIndex: "payableAmount",
      key: "payableAmount",
      align: "center",
      render: (val) => `\u00A3${Number(val).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`,
    },
    {
      title: "Payout Method",
      dataIndex: "payoutMethod",
      key: "payoutMethod",
      render: (_, row) => (
        <span>
          {row.payoutMethod} {row.payoutEmail ? `(${row.payoutEmail})` : ""}
        </span>
      ),
    },
    {
      title: "Status",
      key: "status",
      align: "center",
      render: (_, record) => {
        const paid = localPaid[record.key] ?? false;
        return (
          <div className="flex items-center justify-center">
            <select
              value={paid ? "Paid" : "Unpaid"}
              onChange={(e) => handleStatusChange(record, e.target.value)}
              className={`py-1 px-3 rounded-md text-sm ${paid ? "bg-[#FEEAEA] text-[#C33]" : "bg-[#E7533A] text-white"}`}
              disabled={updateLoading}
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
        );
      },
    },
  ];

  return (
    <div className="rounded-lg border py-4 bg-white mt-8 px-4">
      <h3 className="text-2xl text-black mb-4 pl-2">Payouts</h3>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowClassName={(record) => (localPaid[record.key] ? "bg-[#fde7e6]" : "")}
        pagination={{
          position: ["bottomCenter"],
          current: currentPage,
          pageSize: pageSize,
          total: meta.totalData || 0,
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
