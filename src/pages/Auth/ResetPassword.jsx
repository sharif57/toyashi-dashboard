// import { Button, Checkbox, Input } from "antd";
// import Form from "antd/es/form/Form";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import image from "../../assets/images/reset-pass.png";
// // import ComponentContainer from "../../Components/ComponentContainer";
// import PageHeading from "../../Components/PageHeading";
// // import { useChangePasswordMutation } from "../../redux/features/Auth/authApi";
// // import { useDispatch, useSelector } from "react-redux";
// // import Swal from "sweetalert2";
// // import { setUser } from "../../redux/features/Auth/authSlice";

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   // const dispatch = useDispatch();
//   // const { token } = useSelector((state) => state.auth);
//   // const [mutation, { isLoading }] = useChangePasswordMutation();


//   const onFinish = async (values) => {
//     navigate("/auth");
//     // try {
//     //   const response = await mutation({
//     //     password: values.newPassword,
//     //     // token: token,
//     //   });
//     //   if (response?.data?.statusCode == 200) {
//     //     localStorage.setItem("verify-token", null);
//     //     dispatch(
//     //       setUser({
//     //         user: null,
//     //         token: null,
//     //       })
//     //     );
//     //     navigate("/auth");
//     //     Swal.fire({
//     //       icon: "success",
//     //       title: response?.data?.message,
//     //       showConfirmButton: false,
//     //       timer: 1000,
//     //     });
//     //   } else {
//     //     Swal.fire({
//     //       icon: "error",
//     //       title: "failed!",
//     //       text:
//     //         response?.data?.message ||
//     //         response?.error?.data?.message ||
//     //         "Something went wrong. Please try again later.",
//     //     });
//     //   }
//     // } catch (error) {
//     //   Swal.fire({
//     //     icon: "error",
//     //     title: "Failed !!",
//     //     text: "Something went wrong.",
//     //   });
//     // }
//   };
//   return (
//       <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
//         <div className="lg:border-r-2 border-primary mx-auto w-[96%] lg:p-[10%] ">
//           <img src={image} alt="" />
//         </div>
//         <div className="lg:p-[5%] order-first lg:order-last">
//           <div className="w-full py-[44px] lg:px-[44px] space-y-8">
//             <div className="flex flex-col items-center lg:items-start">
//               <PageHeading backPath={-1} title={"Set new password"} disbaledBackBtn={true} />
//               <p className=" drop-shadow text-[#464343] mt-5">
//                 Your password must be 8-10 character long.
//               </p>
//             </div>
//             <Form
//               name="normal_login"
//               layout="vertical"
//               initialValues={{
//                 remember: true,
//               }}
//               requiredMark={false}
//               onFinish={onFinish}
//             >
//               <Form.Item
//                 label={<span className="font-medium text-base">New Password</span>}
//                 name="newPassword"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input new password!",
//                   },
//                 ]}
//               >
//                 <Input.Password size="large" placeholder="**********" />
//               </Form.Item>
//               <Form.Item
//                 label={<span className="font-medium text-base">Confirm New Password</span>}
//                 name="rePassword"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please Re-Enter the password!",
//                   },
//                   ({ getFieldValue }) => ({
//                     validator(_, value) {
//                       if (!value || getFieldValue("newPassword") === value) {
//                         return Promise.resolve();
//                       }
//                       return Promise.reject(
//                         new Error(
//                           "The new password that you entered do not match!"
//                         )
//                       );
//                     },
//                   }),
//                 ]}
//               >
//                 <Input.Password size="large" placeholder="**********" />
//               </Form.Item>
//               <div className="w-full flex justify-center pt-4 ">
//                   <Button
//                     // disabled={isLoading}
//                     type="primary"
//                     size="large"
//                     htmlType="submit"
//                     className="w-full px-2 "
//                   >
//                     Reset Password
//                   </Button>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default ResetPassword;

import { useState } from "react"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Reset password with:", { password })
    } catch (error) {
      console.error("Reset failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

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
          <div className="mb-6 text-center">
            <h1 className="text-[30px] font-bold">Reset Password</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 pl-10"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon />
                ) : (
                  <EyeIcon />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="mb-4 relative">
              <input
                type={showPassword2 ? "text" : "password"}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 pl-10"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? (
                  <EyeOffIcon />
                ) : (
                  <EyeIcon />
                )}
              </button>
            </div>

           

            <button
              type="submit"
              className={`w-full bg-[#E73E1E] hover:bg-[#D93C0E] text-white font-medium py-3 px-4 rounded-full transition duration-200 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Reset Password"}
            </button>
          </form>

         
        </div>
      </div>
    </div>
  )
}

// SVG icons as components
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59M3 3a9.953 9.953 0 0112 2c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411L21 21" />
  </svg>
)

