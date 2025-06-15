// import { Button } from "antd";
// import { useNavigate } from "react-router-dom";
// import PageHeading from "../../Components/PageHeading";
// import { FaAngleLeft } from "react-icons/fa6";

// const Trust = () => {
//     const navigate = useNavigate();
//     return (
//         <>
//             <div className="flex items-center gap-2 text-xl">
//                 <FaAngleLeft />
//                 <h1>Trust & Safety</h1>
//             </div>
//             <div className="rounded-lg py-4 border-lightGray border-2 shadow-lg mt-8 bg-white">
//                 <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
//                     <h3 className="text-2xl text-black mb-4 border-b-2 border-lightGray/40 pb-3 pl-16">
//                         Trust & Safety
//                     </h3>
//                     <div className="w-full px-16">

//                         <div className="space-y-5 text-black text-sm">
//                             <h1>Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspe  ndisse vitae. Tellus interdum enim lorem vel morbi lectus.</h1>
//                             <h1>Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspendisse vitae. Tellus interdum enim lorem vel morbi lectus.</h1>
//                             <h1>Lorem ipsum dolor sit amet consectetur. Fringilla a cras vitae orci. Egestas duis id nisl sed ante congue scelerisque. Eleifend facilisis aliquet tempus morbi leo sagittis. Pellentesque odio amet turpis habitant. Imperdiet tincidunt nisl consectetur hendrerit accumsan vehicula imperdiet mattis. Neque a vitae diam pharetra duis habitasse convallis luctus pulvinar. Pharetra nunc morbi elementum nisl magnis convallis arcu enim tortor. Cursus a sed tortor enim mi imperdiet massa donec mauris. Sem morbi morbi posuere faucibus. Cras risus ultrices duis pharetra sit porttitor elementum sagittis elementum. Ut vitae blandit pulvinar fermentum in id sed. At pellentesque non semper eget egestas vulputate id volutpat quis. Dolor etiam sodales at elementum mattis nibh quam placerat ut. Suspendisse est adipiscing proin et. Leo nisi bibendum donec ac non eget euismod suscipit. At ultricies nullam ipsum tellus. Non dictum orci at tortor convallis tortor suspendisse. Ac duis senectus arcu nullam in suspe  ndisse vitae. Tellus interdum enim lorem vel morbi lectus.</h1>
//                         </div>
//                         <div className="flex justify-end pt-4">
//                             <Button
//                                 onClick={(e) => navigate(`edit`)}
//                                 size="large"
//                                 type="primary"
//                                 className="px-8 bg-black text-white hover:bg-black/90 rounded-full font-semibold w-1/4"
//                             >
//                                 Edit
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Trust;

import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import {  usePrivacyGetQuery } from "../../redux/feature/settingSlice";
import sanitizeHtml from "sanitize-html"; // Optional: Install for sanitization

const Trust = () => {
  const navigate = useNavigate();

  // Fetching the About Us data
  const { data, isLoading, error } = usePrivacyGetQuery();
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
        <PageHeading title="Trust & Safety" />
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

export default Trust;