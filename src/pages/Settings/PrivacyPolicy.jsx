
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import { useAboutGetQuery } from "../../redux/feature/settingSlice";
import sanitizeHtml from "sanitize-html"; // Optional: Install for sanitization

const AboutUs = () => {
  const navigate = useNavigate();

  // Fetching the About Us data
  const { data, isLoading, error } = useAboutGetQuery();
  console.log(data, "about-us-data");

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
        <Button
          onClick={() => window.location.reload()} // Optional: Retry button
          style={{ backgroundColor: "#033f4d", color: "#fff" }}
          className="mt-4 w-[200px] h-[40px] text-[16px] font-medium"
        >
          Retry
        </Button>
      </div>
    );
  }

  // Extracting and sanitizing the descriptions
  let descriptions = [];
  if (data?.data) {
    if (Array.isArray(data.data)) {
      descriptions = data.data.map((item) => ({
        description: sanitizeHtml(item.description || "", {
          allowedTags: ["b", "i", "em", "strong", "p"], // Customize allowed tags
          allowedAttributes: {},
        }),
      }));
    } else if (typeof data.data === "object" && data.data.description) {
      descriptions = [
        {
          description: sanitizeHtml(data.data.description || "", {
            allowedTags: ["b", "i", "em", "strong", "p"],
            allowedAttributes: {},
          }),
        },
      ];
    }
  }

  return (
    <div className="min-h-[70vh] flex flex-col justify-between">
      <div className="space-y-4">
        <PageHeading title="Privacy Policy" />
        <div className="space-y-4">
          {descriptions.length > 0 ? (
            descriptions.map((item, index) => (
              <p
                key={index}
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
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