import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import { useAboutGetQuery } from "../../redux/feature/settingSlice";

const AboutUs = () => {
  const navigate = useNavigate();

  // Fetching the About Us data
  const { data, isLoading, error } = useAboutGetQuery();

  // Handling loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center">
        <p className="text-red-500 text-lg">
          Failed to load About Us data. Please try again later.
        </p>
      </div>
    );
  }

  // Extracting the descriptions
  const descriptions = data?.data?.map((item) => item.description) || [];

  return (
    <div className="min-h-[70vh] flex flex-col justify-between">
      <div className="space-y-4">
        <PageHeading title={"About Us"} />
        <div className="space-y-4">
          {descriptions.length > 0 ? (
            descriptions.map((description, index) => (
              <p key={index} className="text-gray-600">
                {description}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No information available.</p>
          )}
        </div>
      </div>
      <div className="flex justify-end pt-10">
        <Button
          onClick={() => navigate("edit")}
          style={{
            backgroundColor: "#033f4d",
            color: "#fff",
          }}
          htmlType="submit"
          className="w-[400px] h-[56px] placeholder:text-[#999999] text-[18px] font-medium"
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default AboutUs;