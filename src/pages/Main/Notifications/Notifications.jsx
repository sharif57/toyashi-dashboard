
import { FaAngleLeft } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  return (
    <div className=" rounded-lg min-h-screen bg-[#FDFDFD]">
      <div className="px-[32px] py-6 text-white bg-info rounded-t-lg flex items-center gap-3">
          <FaAngleLeft onClick={() => navigate(-1)} className="text-white" size={34} />
        <h1 className="text-[30px] text-[#052255] font-bold">All Notifications</h1> 
      </div>
      <div className="p-[24px]">
        <div className="group flex items-center gap-4 px-[24px] py-4 cursor-pointer border-b  hover:bg-[#E73E1E] rounded-lg hover:text-white transition-all">
          <IoIosNotificationsOutline
            style={{ cursor: "pointer" }}
            className={`border border-black w-[42px] h-[42px] rounded-full p-1.5 shadow-sm bg text-info group-hover:bg-white  text-[#E73E1E]`}
          />
          <div className="space-y-[2px]">
            <h6 className="text-lg">You have received $500 from John Doe</h6>
            <small className="text-[12px] ">Fri, 12:30pm</small>
          </div>
        </div>
        <div className="group flex items-center gap-4 px-[24px] py-4 cursor-pointer border-b border-blue-50  hover:bg-[#E73E1E] rounded-lg hover:text-white transition-all">
          <IoIosNotificationsOutline
            style={{ cursor: "pointer" }}
            className={`border border-black w-[42px] h-[42px] rounded-full p-1.5 shadow-sm bg text-info group-hover:bg-white  text-[#E73E1E]`}
          />
          <div className="space-y-[2px]">
            <h6 className="text-lg">You have received $500 from John Doe</h6>
            <small className="text-[12px] ">Fri, 12:30pm</small>
          </div>
        </div>
        <div className="group flex items-center gap-4 px-[24px] py-4 cursor-pointer border-b border-blue-50 0 hover:bg-[#E73E1E] rounded-lg hover:text-white transition-all">
          <IoIosNotificationsOutline
            style={{ cursor: "pointer" }}
            className={`border border-black w-[42px] h-[42px] rounded-full p-1.5 shadow-sm bg text-info group-hover:bg-white  text-[#E73E1E]`}
          />
          <div className="space-y-[2px]">
            <h6 className="text-lg">You have received $500 from John Doe</h6>
            <small className="text-[12px] ">Fri, 12:30pm</small>
          </div>
        </div>
        <div className="group flex items-center gap-4 px-[24px] py-4 cursor-pointer border-b border-blue-50  hover:bg-[#E73E1E] rounded-lg hover:text-white transition-all">
          <IoIosNotificationsOutline
            style={{ cursor: "pointer" }}
            className={`border border-black w-[42px] h-[42px] rounded-full p-1.5 shadow-sm bg text-info group-hover:bg-white  text-[#E73E1E]`}
          />
          <div className="space-y-[2px]">
            <h6 className="text-lg">You have received $500 from John Doe</h6>
            <small className="text-[12px] ">Fri, 12:30pm</small>
          </div>
        </div>
        <div className="group flex items-center gap-4 px-[24px] py-4 cursor-pointer border-b border-blue-50  hover:bg-[#E73E1E] rounded-lg hover:text-white transition-all">
          <IoIosNotificationsOutline
            style={{ cursor: "pointer" }}
            className={`border border-black w-[42px] h-[42px] rounded-full p-1.5 shadow-sm bg text-info group-hover:bg-white  text-[#E73E1E]`}
          />
          <div className="space-y-[2px]">
            <h6 className="text-lg">You have received $500 from John Doe</h6>
            <small className="text-[12px] ">Fri, 12:30pm</small>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Notifications;
