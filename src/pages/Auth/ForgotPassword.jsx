// import { Button, Checkbox, Input } from "antd";
// import Form from "antd/es/form/Form";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import image from "../../assets/images/forgot.png";
// import PageHeading from "../../Components/PageHeading";
// // import { useForgotPasswordMutation } from "../../redux/features/Auth/authApi";
// // import Swal from "sweetalert2";

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   // const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
//   const onFinish = async (values) => {
//     navigate(`/auth/verify-email`);
//     // try {
//     //   const response = await forgotPassword(values);
//     //   // console.log(response);
//     //   if (response?.data?.statusCode == 200) {
//     //     navigate(`/auth/verify-email/${values.email}`);
//     //   } else {
//     //     Swal.fire({
//     //       icon: "error",
//     //       title: "Failed!!",
//     //       text:
//     //         response?.data?.message ||
//     //         response?.error?.data?.message ||
//     //         "Something went wrong. Please try again later.",
//     //     });
//     //   }
//     // } catch (error) {
//     //   Swal.fire({
//     //     icon: "error",
//     //     title: "Failed!!",
//     //     text: "Something went wrong. Please try again later.",
//     //   });
//     // }
//   };
//   return (
//     <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
//       <div className="border-r-0 lg:border-r-2 border-primary w-[99%] p-[8%] lg:p-[12%] lg:pr-0">
//         <img src={image} alt="" />
//       </div>
//       <div className="lg:p-[5%] order-first lg:order-last">
//         <div className="w-full py-[64px] lg:px-[44px] space-y-8">
//           <div className="flex flex-col items-center lg:items-start">
//             <PageHeading backPath={"/auth"} title={"Forgot Password"} disbaledBackBtn={true} />
//             <p className="drop-shadow text-hash mt-4 text-center lg:text-start">
//               Enter your email address to get a verification code for resetting
//               your password. Please enter your email address to reset your
//               password.
//             </p>
//           </div>
//           <Form
//             name="normal_login"
//             layout="vertical"
//             initialValues={{
//               remember: true,
//             }}
//             onFinish={onFinish}
//           >
//             <Form.Item
//               name="email"
//               rules={[
//                 {
//                   type: "email",
//                   message: "Please input valid email!",
//                 },
//                 {
//                   required: true,
//                   message: "Please input your email!",
//                 },
//               ]}
//             >
//               <Input size="large" placeholder="Enter your email" />
//             </Form.Item>
//             <div className="w-full flex justify-center pt-5">
//                 <Button
//                   // disabled={isLoading}
//                   type="primary"

//                   size="large"
//                   htmlType="submit"
//                   className="w-full px-2 bg-playground"
//                 >
//                   Get OTP
//                 </Button>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login attempt with:", { email });
      navigate("/auth/verify-email");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Logo Section */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="max-w-[240px] w-full">
          <img src="/Vector (2).png" alt="Logo" width={240} height={240} />
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-[#FFF0F0] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
          <div className="mb-6 flex items-center justify-center">
            <h1 className="text-[30px] font-bold">Forget Password</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4 relative">
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 pl-10"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full bg-[#E73E1E] hover:bg-[#D93C0E] text-white font-medium py-3 px-4 rounded-full transition duration-200 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Send OTP..." : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
