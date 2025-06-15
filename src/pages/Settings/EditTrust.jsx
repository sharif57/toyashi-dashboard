// import { Button } from "antd";
// import { useNavigate } from "react-router-dom";
// import PageHeading from "../../Components/PageHeading";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useState } from "react";
// import { FaAngleLeft } from "react-icons/fa6";
// import Quill from "quill";

// // Import 'size' style attributor
// const Size = Quill.import("attributors/style/size");
// Size.whitelist = ["14px", "16px", "18px"]; // Custom font sizes
// Quill.register(Size, true);

// const modules = {
//     toolbar: {
//         container: [
//             [{ size: ["14px", "16px", "18px"] }], // Use whitelisted sizes
//             [{ color: [] }], // Text color dropdown
//             ["bold", "italic", "underline", 'strike'], // Formatting options
//             [{ align: [] }],
//             ["image", "link"],
//             [{ list: 'bullet' }],
//         ],
//         handlers: {
//             align: function (value) {
//                 this.quill.format('align', value);
//             },
//         },
//     },
// };

// const formats = [
//     "size", // Custom font sizes
//     "color",
//     "align",
//     "bold",
//     "italic",
//     "underline",
//     "link",
//     "image",
//     "list",
// ];
// const EditTrust = () => {
//     const navigate = useNavigate();
//     const [content, setContent] = useState("");
//     console.log(content);

//     return (
//         <>
//             <div className="flex items-center gap-2 text-xl">
//                 <FaAngleLeft />
//                 <h1>Trust & Safety </h1>
//             </div>
//             <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
//                 <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
//                     <h3 className="text-2xl text-black mb-4 border-b-2 border-lightGray/40 pb-3 pl-16">
//                         Trust & Safety Edit
//                     </h3>
//                     <div className="w-full px-16">
//                         <div className="h-full border border-gray-400 rounded-md">
//                             <div className="ql-toolbar-container h-56">
//                                 {/* <div id="toolbar">
//                   <span className="ql-formats">

//                     <button className="ql-align" value="left">
//                       Left
//                     </button>
//                     <button className="ql-align" value="center">
//                       Center
//                     </button>
//                     <button className="ql-align" value="right">
//                       Right
//                     </button>
//                     <button className="ql-align" value="justify">
//                       Justify
//                     </button>
//                   </span>

//                 </div> */}
//                                 <ReactQuill
//                                     placeholder="Enter your update terms & conditions..."
//                                     theme="snow"
//                                     value={content}
//                                     onChange={(value) => setContent(value)}
//                                     modules={modules}
//                                     formats={formats}
//                                     className="custom-quill-editor"
//                                 />
//                             </div>
//                         </div>

//                     </div>
//                     <div className="flex justify-end pt-8 pr-16">
//                         <Button
//                             onClick={(e) => navigate(`edit`)}
//                             size="large"
//                             type="primary"
//                             className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold w-1/4"
//                         >
//                             Update
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </>

//     );
// };

// export default EditTrust;


import { Button, message, Spin } from "antd";
import { useMemo, useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";

import {  usePrivacyGetQuery, useUpdatePrivacyMutation } from "../../redux/feature/settingSlice";

const EditTrust = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  // Fetch current Privacy Policy content
  const { data, isLoading, error } = usePrivacyGetQuery();

  // Mutation for updating Privacy Policy content
  const [updatePrivacy, { isLoading: isUpdating }] = useUpdatePrivacyMutation();

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
      navigate("/settings/trust-safety"); // Navigate back to the Privacy Policy page
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
          title={"Edit Trust & Safety"}
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

export default EditTrust;
