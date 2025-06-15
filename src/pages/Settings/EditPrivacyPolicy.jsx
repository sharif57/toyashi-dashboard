

import { Button, message, Spin } from "antd";
import { useMemo, useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";

import { useAboutGetQuery, useUpdateAboutMutation } from "../../redux/feature/settingSlice";

const EditPrivacyPolicy = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // Fetch current Privacy Policy content
  const { data, isLoading, error } = useAboutGetQuery();

  // Mutation for updating Privacy Policy content
  const [updatePrivacy, { isLoading: isUpdating }] = useUpdateAboutMutation();

  // Jodit Editor Configuration
  const placeholder = "Enter your update privacy policy...";
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
      height: "60vh",
    }),
    [placeholder]
  );

  // Pre-fill editor with current content when data is fetched
  useEffect(() => {
    if (data?.data?.[0]?.description) {
      setContent(data.data[0].description);
    }
  }, [data]);

  // Handle Save Button Click
  const handleSave = async () => {
    if (!content.trim()) {
      message.warning("Privacy Policy content cannot be empty!");
      return;
    }

    try {
      const response = await updatePrivacy({ description: content }).unwrap();
      message.success(
        response.message || "Privacy Policy updated successfully!"
      );
      navigate("/settings/privacy-policy"); // Navigate back to the Privacy Policy page
    } catch (error) {
      console.error("Update failed:", error);
      message.error(error.data?.message || "Failed to update Privacy Policy.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[75vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[75vh] flex flex-col justify-center items-center">
        <p className="text-red-500 text-lg">
          Error loading Privacy Policy content.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] flex flex-col justify-between">
      <div className="space-y-6">
        <PageHeading
          title={"Edit Privacy Policy"}
          backPath={"/settings/privacy-policy"}
        />
        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
            className="text-wrap"
            config={config}
            tabIndex={1}
          />
        </div>
      </div>
      <div className="flex justify-end pt-10">
        <Button
          style={{
            backgroundColor: "#033f4d",
            color: "#fff",
          }}
          htmlType="button"
          onClick={handleSave}
          loading={isUpdating} // Show loading indicator during update
          className="w-[400px] h-[56px] placeholder:text-[#999999] text-[18px] font-medium"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default EditPrivacyPolicy;
