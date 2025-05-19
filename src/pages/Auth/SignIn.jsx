// import { useState } from "react"
// import { Link } from "react-router-dom"


// export default function SignIn() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [rememberMe, setRememberMe] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsLoading(true)

//     // Simulate API call
//     try {
//       // Here you would typically make an API call to authenticate
//       await new Promise((resolve) => setTimeout(resolve, 1000))
//       console.log("Login attempt with:", { email, password, rememberMe })
//       // Handle successful login (redirect, set cookies, etc.)
//     } catch (error) {
//       console.error("Login failed:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="flex flex-col md:flex-row h-screen w-full">
//       {/ Logo Section /}
//       <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8">
//         <div className="max-w-[240px] w-full">
//           <img src="/logo.svg" alt="Logo" width={240} height={240}  />
//         </div>
//       </div>

//       {/ Form Section /}
//       <div className="w-full md:w-1/2 bg-[#FFF0F0] flex items-center justify-center p-4">
//         <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full">
//           <div className="mb-6 flex items-center">
//             <Link href="/" className="text-gray-600 hover:text-gray-800">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 inline mr-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//               </svg>
//             </Link>
//             <h1 className="text-xl font-medium">Sign In</h1>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <div className="relative">
//                 <input
//                   type="email"
//                   id="email"
//                   className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 pl-10"
//                   placeholder="Enter your email..."
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-4">
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   id="password"
//                   className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 pl-10"
//                   placeholder="Enter Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                     />
//                   </svg>
//                 </div>
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-gray-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
//                       />
//                     </svg>
//                   ) : (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 text-gray-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                       />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="remember"
//                   className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                 />
//                 <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
//                   Remember me
//                 </label>
//               </div>
//               <div>
//                 <Link href="/forgot-password" className="text-sm text-orange-500 hover:text-orange-600">
//                   Forgot password?
//                 </Link>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className={`w-full bg-[#F24E1E] hover:bg-[#D93C0E] text-white font-medium py-3 px-4 rounded-md transition duration-200 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
//               disabled={isLoading}
//             >
//               {isLoading ? "Signing In..." : "Sign In"}
//             </button>
//           </form>

//           <div className="text-center mt-4 text-sm text-gray-600">
//             Dont have an account?{" "}
//             <Link href="/signup" className="text-orange-500 hover:text-orange-600 font-medium">
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState } from "react"
import { Link } from "react-router-dom"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Login attempt with:", { email, password, rememberMe })
    } catch (error) {
      console.error("Login failed:", error)
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
          <div className="mb-6 flex items-center justify-center">
            {/* <Link to="/" className="text-gray-600 hover:text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link> */}
            <h1 className="text-[30px] font-bold">Sign In</h1>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 pl-10"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Remember Me + Forgot */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <Link to="/auth/forgot-password" className="text-sm text-orange-500 hover:text-orange-600">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full bg-[#E73E1E] hover:bg-[#D93C0E] text-white font-medium py-3 px-4 rounded-full transition duration-200 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-4 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-orange-500 hover:text-orange-600 font-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
