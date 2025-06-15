

import { useState } from "react";
import DashboardHomeTable from "../../../Components/DashboardHomeTable";
import HostsTable from "../../../Components/HostsTable";
import { Link } from "react-router-dom";
import { useAllUsersQuery, useTotalHostQuery } from "../../../redux/feature/userSlice";
import { useAllPartyQuery } from "../../../redux/feature/partySlice";

const DashboardHome = () => {
  const [activeTable, setActiveTable] = useState("users"); // 'users' or 'hosts'
  const { data } = useAllUsersQuery({ page: 1, limit: 10 });
   const { data: allParties } = useAllPartyQuery({
    page: 1,
    limit: 10,
  });

  const {data:hosts}= useTotalHostQuery({page:1,limit:10})
  console.log(hosts?.data?.meta?.total)

  return (
    <div className="space-y-6">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-3/5">
        {/* Total Users Card */}
        <div
          className={`flex items-center gap-4 p-6 rounded-xl bg-white shadow-sm cursor-pointer transition-all ${
            activeTable === "users" ? "border border-[#E73E1E]" : ""
          }`}
          onClick={() => setActiveTable("users")}
        >
          <div className="bg-[#FAE9E6] p-4 rounded-2xl">
            <img src="/users.png" alt="Users icon" className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg text-gray-600">Total Users</h3>
            <p className="text-3xl font-light">{data?.data?.totalData}</p>
          </div>
        </div>

        {/* Total Host Card */}
        <div
          className={`flex items-center gap-4 p-6 rounded-xl bg-white shadow-sm cursor-pointer transition-all ${
            activeTable === "hosts" ? "border border-[#E73E1E]" : ""
          }`}
          onClick={() => setActiveTable("hosts")}
        >
          <div className="bg-[#FAE9E6] p-4 rounded-2xl">
            <img src="/crown-03.png" alt="Host icon" className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg text-gray-600">Total Host</h3>
            <p className="text-3xl font-light">{hosts?.data?.meta?.total}</p>
          </div>
        </div>

        {/* Total Party Card */}
        <Link
          to={"/parties"}
          className="flex items-center gap-4 p-6 rounded-xl bg-white shadow-sm"
        >
          <div className="bg-[#FAE9E6] p-4 rounded-2xl">
            <img src="/party.png" alt="Party icon" className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg text-gray-600">Total Party</h3>
            <p className="text-3xl font-light">{allParties?.data?.meta?.totalData}</p>
          </div>
        </Link>
      </div>

      {/* Table Section */}
      {activeTable === "users" ? <DashboardHomeTable /> : <HostsTable />}
    </div>
  );
};

export default DashboardHome;
