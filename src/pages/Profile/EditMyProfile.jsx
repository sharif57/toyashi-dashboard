import  { useState, useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import dashProfile from "../../assets/images/dashboard-profile.png";
import { FaAngleLeft } from "react-icons/fa6";
import { PiCameraPlus } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation, useUserProfileQuery } from "../../redux/feature/userSlice";

const EditMyProfile = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data: profileResponse, isLoading } = useUserProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const IMAGE = import.meta.env.VITE_IMAGE_API;

  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Prefill form with profile data
  useEffect(() => {
    if (profileResponse?.data) {
      const { email, image, name = email?.split("@")[0] || name, phone = "+880 150597212" } = profileResponse.data;
      form.setFieldsValue({ name, email, phone });
      setImagePreview(image ? `${IMAGE}${image}` : dashProfile);
    }
  }, [profileResponse, form, IMAGE]);

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ phone: values.phone , name: values.name, }));
    if (imageFile) formData.append("image", imageFile);

    try {
    const response =  await updateProfile(formData).unwrap();
      message.success("Phone number updated successfully!");
      // navigate(-1);
      window.location.href = "/settings/profile";
    } catch (error) {
      message.error("Failed to update phone number. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Form failed:", errorInfo);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading profile...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <div className="flex items-center gap-4 mb-6">
        <FaAngleLeft className="text-xl cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-2xl font-semibold">Edit Personal Information</h1>
      </div>

      <Form
        form={form}
        name="editProfile"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="space-y-6"
      >
        {/* Profile Image Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
            <label
              htmlFor="image-upload"
              className="absolute bottom-2 right-2 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700"
            >
              <PiCameraPlus />
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <Form.Item
            label="Name"
            name="name"
            className="text-lg font-medium"
          >
            <Input
              // readOnly
              size="large"
              className="w-full rounded-lg"
              value={profileResponse?.data?.name || profileResponse?.data?.email?.split("@")[0] || "User"}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            className="text-lg font-medium"
          >
            <Input
              readOnly
              size="large"
              className="w-full rounded-lg"
              value={profileResponse?.data?.email || "N/A"}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
              { pattern: /^\+\d{10,}$/, message: "Phone number must start with + and be at least 10 digits!" },
            ]}
            className="text-lg font-medium"
          >
            <Input
              size="large"
              className="w-full rounded-lg"
              placeholder="+1234567890"
            />
          </Form.Item>
        </div>

        {/* Save Button */}
        <Form.Item className="text-right">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-6"
          >
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditMyProfile;