import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge } from "antd";
import profileImage from "../../assets/images/dash-profile.png";
import { TbBellRinging } from "react-icons/tb";

import { useUserProfileQuery } from "../../redux/feature/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const loacatin = useLocation();
  const notificationRef = useRef(null);
  const [notificationPopup, setNotificationPopup] = useState(false);
  console.log(notificationPopup)

const {data} =useUserProfileQuery()
console.log(data)
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setNotificationPopup(false);
  }, [loacatin.pathname]);

    const IMAGE = import.meta.env.VITE_IMAGE_API;


  return (

    <div className="w-full h-[88px] flex justify-between items-center rounded-lg py-[16px] px-[32px] shadow-lg bg-white border border-[#E73E1E]">
      <div className="text-start space-y-0.5">
        <p className="text-sm md:text-xl font-light">
          {`Welcome, ${data?.data?.name}` }
        </p>
        <p className="text-sm md:text-xl">{"Have a nice day!"}</p>
      </div>
      <div className="flex gap-x-[41px]">
        <div
          onClick={(e) => navigate("/notifications")}
          className="relative flex items-center "
        >
          <Badge style={{ backgroundColor: "#000000", width: '20px', height: '20px', objectFit: 'contain' }} count={1}>
            <TbBellRinging
              style={{ cursor: "pointer" }}
              className={` w-6 h-6 rounded-full shadow-sm  font-bold transition-all`}
            />
          </Badge>
        </div>
        <Link to="/settings" className="flex items-center">
          <div className="flex items-center gap-2">
            <img src={`${IMAGE}/${data?.data?.image}` ||profileImage} alt="" className="rounded-full h-[42px] w-[42px]" />
            <h1>{data?.data?.name}</h1>
          </div>
      
        </Link>
      </div>
    </div>
  );
};

export default Header;
