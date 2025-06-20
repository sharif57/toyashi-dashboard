import { useAllPartyQuery } from "../../../redux/feature/partySlice";
import { useAllUsersQuery } from "../../../redux/feature/userSlice";
import Transaction from "./Transaction";

export default function TransactionHome() {
   const { data } = useAllUsersQuery({ page: 1, limit: 10 });
     const { data: allParties } = useAllPartyQuery({
      page: 1,
      limit: 10,
    });
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-32  gap-y-10 ">
        <div className=" flex items-center justify-center gap-6 rounded-lg bg-white  ">
          <div className="bg-[#FAE9E6] p-6 rounded-2xl">
            <img src="/users.png" alt="" />
          </div>
          <div className="text-center">
            <h3 className="text-[20px]">{"Total users"}</h3>
            <h3 className="text-[30px] font-extralight">{data?.data?.totalData}</h3>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 px-[24px]  py-[20px] rounded-lg space-y-3 bg-white w-96 md:w-full">
          <div className="bg-[#FAE9E6] p-6 rounded-2xl">
            <img src="/party.png" alt="" />
          </div>
          <div className="text-center">
            <h3 className="text-[20px]">{"Total Party"}</h3>
            <h3 className="text-[30px] font-extralight">{allParties?.data?.meta?.totalData}</h3>
          </div>
        </div>
      </div>

      <Transaction></Transaction>
      
    </div>
  );
}
