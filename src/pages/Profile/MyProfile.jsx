import { useState } from "react";
import { Button, Form, Input } from "antd";
import dashProfile from "../../assets/images/dashboard-profile.png";
import { Outlet, useNavigate } from "react-router-dom";
import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
import { FaAngleLeft, FaRegEdit } from "react-icons/fa";
import { useUserProfileQuery } from "../../redux/feature/userSlice";

const MyProfile = () => {
  const { data: profileResponse, isLoading } = useUserProfileQuery();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const IMAGE = import.meta.env.VITE_IMAGE_API;

  // Extract profile data from API response
  const profileData = profileResponse?.data || {};
  const {
    email = "N/A",
    role = "N/A",
    image = "",
    name = "", // Fallback since name is not in API response
    phone = "", // Placeholder for phone (not in API)
  } = profileData;

  // Construct image URL or use fallback
  const profileImage = image ? `${IMAGE}${image}` : dashProfile;

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading profile...</div>;
  }

  return (
    <>
      <div className="flex items-center gap-2 text-xl">
        <FaAngleLeft />
        <h1>Personal Information</h1>
      </div>
      <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
        <h3 className="text-2xl text-black mb-4 pl-5 border-b-2 border-lightGray/40 pb-3">
          Personal Information
        </h3>
        <div>
          <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
            <div className="w-full">
              <div className="py-4 px-8 flex justify-end items-center">
                <Button
                  onClick={() => navigate("edit")}
                  size="large"
                  type="default"
                  className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold"
                >
                  <FaRegEdit />
                  Edit Profile
                </Button>
              </div>

              <Form
                name="basic"
                layout="vertical"
                className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
                autoComplete="off"
                initialValues={{
                  name,
                  email,
                  phone,
                }}
              >
                <div className="col-span-3 space-y-6">
                  <div className="min-h-[300px] flex flex-col items-center justify-center p-8 border border-black bg-lightGray/15">
                    <div className="my-2">
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="h-28 w-28 rounded-full border-4 border-black"
                      />
                    </div>
                    <h5 className="text-lg text-[#222222]">Profile</h5>
                    <h4 className="text-2xl text-[#222222]">{role}</h4>
                  </div>
                </div>
                <div className="col-span-9 space-y-[14px] w-full">
                  <Form.Item
                    className="text-lg font-medium text-black -mb-1"
                    label="Name"
                    name="name"
                  >
                    <Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg"
                      value={name}
                    />
                  </Form.Item>
                  <Form.Item
                    className="text-lg font-medium text-black"
                    label="Email"
                    name="email"
                  >
                    <Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg"
                      value={email}
                    />
                  </Form.Item>
                  <Form.Item
                    className="text-lg text-[#222222] font-medium"
                    label="Phone Number"
                    name="phone"
                  >
<Input
                      readOnly
                      size="large"
                      className="h-[53px] rounded-lg"
                      value={phone}
                    />
                  </Form.Item>
                </div>
              </Form>
            </div>
            <PasswordChangeModalForm
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
        <div className="p-[24px] pt-0.5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MyProfile;