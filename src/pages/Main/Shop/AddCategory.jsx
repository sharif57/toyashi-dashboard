// import { useState, useRef, useEffect } from "react";
// import { ArrowLeft, Image, X } from "lucide-react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { useAllCategoriesQuery, useCreateCategoryMutation, useShopsPostMutation } from "../../../redux/feature/shopSlice";
// import { IoChevronDown, IoClose } from "react-icons/io5";

// export default function AddCategory() {
//   const navigate = useNavigate();
//   const {id} = useParams();
//   console.log(id, 'id')
//   const [shopsPost] = useShopsPostMutation();
//   const {data} = useAllCategoriesQuery();
//   console.log(data?.data , 'datacategory')
//   const fileInputRef = useRef(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     category: id,
//     rating: "",
//     link: "",
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [error, setError] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [categoryName, setCategoryName] = useState('');
//     const [createCategory] = useCreateCategoryMutation();


//     const handleCreateCategory = async () => {
//       try {
//         const res = await createCategory(categoryName).unwrap();
//         console.log("API Response:", res);
//         // navigate("/shop"); // Uncomment this when ready
//       } catch (error) {
//         console.error("API Error:", error);
//       }
//     };


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageSelect = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       // Optional: Validate file type and size
//       const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
//       if (!allowedTypes.includes(file.type)) {
//         setError("Please upload a valid image (JPEG, PNG, or GIF)");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         setError("Image size must be less than 5MB");
//         return;
//       }

//       setImageFile(file);
//       setError(null);

//       // Create preview URL
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         if (e.target?.result) {
//           setImagePreview(e.target.result);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const clearImage = () => {
//     setImageFile(null);
//     setImagePreview(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [selectedItem, setSelectedItem] = useState('Select Option');

   

//     // outside click to off the dropdown
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             let target = event.target;

//             if (!target.closest('.dropdown')) {
//                 setIsDropdownOpen(false);
//             }
//         };
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError(null);

//   // Validate form data
//   if (!formData.title || !formData.price || !formData.rating || !formData.link) {
//     setError("Please fill out all fields");
//     return;
//   }

//   if (!imageFile) {
//     setError("Please upload an image");
//     return;
//   }

//   // Create FormData object
//   const formDataToSend = new FormData();
//   formDataToSend.append("data", JSON.stringify({
//     title: formData.title,
//     price: parseFloat(formData.price),
//     category: id, // Use the id from params directly
//     rating: parseFloat(formData.rating),
//     link: formData.link,
//   }));
//   formDataToSend.append("image", imageFile);

//   try {
//     const res = await shopsPost(formDataToSend).unwrap();
//     console.log("API Response:", res);
//     navigate("/shop"); // Uncomment this when ready
//   } catch (err) {
//     console.error("Error posting item:", err);
//     setError(err.data?.message || "Failed to add item. Please try again.");
//   }
// };
//   return (
//     <div className="rounded-lg bg-white">
//       {/* Header */}
//       <header className="flex items-center justify-between p-4 border-b border-[#FFD6D3]">
//         <Link
//           to="/shop"
//           className="flex items-center text-[#E64A19] font-medium"
//         >
//           <ArrowLeft className="w-5 h-5 mr-2" />
//           Add Item
//         </Link>
//         <div>
//             <button onClick={() => setIsModalOpen(true)} className="bg-[#E64A19] hover:bg-[#D84315] text-white font-medium py-3 px-8 rounded-xl transition-colors w-full max-w-xs"
// >Add Category</button>
//         </div>
//       </header>

//       {/* Form */}
//       <div className="mx-auto p-4">
//         <h1 className="text-xl font-bold mb-6">Add Item</h1>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Image Upload */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Image</label>
//               <div className="relative">
//                 {imagePreview ? (
//                   <div className="relative w-full h-40 rounded-md overflow-hidden">
//                     <img
//                       src={imagePreview}
//                       alt="Preview"
//                       className="w-full h-full object-cover"
//                     />
//                     <button
//                       type="button"
//                       onClick={clearImage}
//                       className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
//                     >
//                       <X className="w-4 h-4 text-red-500" />
//                     </button>
//                   </div>
//                 ) : (
//                   <div
//                     className="w-full bg-[#FFF8F8] border border-[#FFD6D3] rounded-md p-3 cursor-pointer"
//                     onClick={() => fileInputRef.current?.click()}
//                   >
//                     <div className="flex justify-between items-center w-full">
//                       <span className="text-gray-500">Select image</span>
//                       <Image className="w-5 h-5" />
//                     </div>
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       accept="image/jpeg,image/png,image/gif"
//                       className="hidden"
//                       onChange={handleImageSelect}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Title */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Enter title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 className="w-full bg-[#FFF8F8] border border-[#FFD6D3] rounded-md p-3"
//               />
//             </div>

//             {/* Price */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Enter price"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 className="w-full bg-[#FFF8F8] border border-[#FFD6D3] rounded-md p-3"
//               />
//             </div>

//             {/* Rating */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Rating</label>
//               <input
//                 type="number"
//                 name="rating"
//                 placeholder="Enter rating"
//                 min="0"
//                 max="5"
//                 step="0.1"
//                 value={formData.rating}
//                 onChange={handleInputChange}
//                 className="w-full bg-[#FFF8F8] border border-[#FFD6D3] rounded-md p-3"
//               />
//             </div>

//             {/* Link */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Link</label>
//               <input
//                 type="url"
//                 name="link"
//                 placeholder="Paste your link"
//                 value={formData.link}
//                 onChange={handleInputChange}
//                 className="w-full bg-[#FFF8F8] border border-[#FFD6D3] rounded-md p-3"
//               />
//             </div>

//                 {/* add category deropdown */}
//                 <div className='
//                   flex items-center flex-col gap-5 justify-center '>
                    
//             <button
//                 className='   w-full bg-[#FFF8F8] border border-[#FFD6D3] rounded-md p-3 justify-between px-3 py-3 flex items-center gap-8  relative cursor-pointer dropdown'
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//                 {selectedItem}
//                 <IoChevronDown
//                     className={`${
//                         isDropdownOpen ? ' rotate-[180deg]' : ' rotate-0'
//                     } transition-all duration-300 text-[1.2rem]`}
//                 />
//                 <div
//                     className={`${
//                         isDropdownOpen
//                             ? 'z-[1] opacity-100 scale-[1]'
//                             : 'z-[-1] opacity-0 scale-[0.8]'
//                     } w-full absolute top-12 dark:bg-slate-800 left-0 right-0 z-40 bg-[#fff] rounded-xl flex flex-col  overflow-hidden transition-all duration-300 ease-in-out`}
//                     style={{
//                         boxShadow: '0 15px 60px -15px rgba(0, 0, 0, 0.3)',
//                     }}
//                 >
//                     {data?.data?.map((option, index) => (
//                         <p
//                             className='py-2 px-4  bg-[#ececec] transition-all duration-200 flex items-center gap-2'
//                             key={index}
//                             onClick={(e) => setSelectedItem(e.target.textContent)}
//                         >
                            
//                             {option.categoryName}
//                         </p>
//                     ))}
//                 </div>
//             </button>
//         </div>

//           </div>

//           {/* Save Button */}
//           <div className="mt-8 flex justify-center">
//             <button
//               type="submit"
//               className="bg-[#E64A19] hover:bg-[#D84315] text-white font-medium py-3 px-8 rounded-full transition-colors w-full max-w-xs"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>

//                  <div
            
//             className={`${
//                 isModalOpen ? " visible" : " invisible"
//             } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#FEF3F0] transition-all duration-300 flex items-center justify-center`}
//         >
//             <div
//                 className={`${
//                     isModalOpen
//                         ? " scale-[1] opacity-100"
//                         : " scale-[0] opacity-0"
//                 } w-[90%] sm:w-[80%] md:w-[25%] bg-[#FEF3F0]  rounded-lg transition-all px-2 py-6 duration-300 mx-auto mt-8`}
//             >
//                 <div className="flex items-center justify-end px-4">
                    
//                     <IoClose
//                     onClick={() => setIsModalOpen(false)}
//                         className="p-2 text-[2.5rem] text-black  dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
//                     />
//                 </div>

//                 <form className="flex flex-col gap-5 p-4">
//                     <div>
                      
//                         <input
//                             type="text"
//                             name="categoryName"
//                             id="categoryName"
//                             value={categoryName}
//                             onChange={(e) => setCategoryName(e.target.value)}
//                             placeholder="Enter Category Name"
//                             className="py-2 px-3 border dark:border-slate-700  dark:placeholder:text-slate-500 dark:text-[#abc2d3] border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
//                         />
//                     </div>
//                     <button
//                      onSubmit={handleCreateCategory}
//                         type="submit"
//                         className="py-2 px-4 w-full bg-[#E73E1E] text-[#fff] rounded-md"
//                     >
//                        Create New Category
//                     </button>
//                 </form>

//             </div>
//         </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Image, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAllCategoriesQuery, useCreateCategoryMutation, useShopsPostMutation } from "../../../redux/feature/shopSlice";
import { IoChevronDown, IoClose } from "react-icons/io5";

export default function AddCategory() {
  const navigate = useNavigate();
  
  const [shopsPost] = useShopsPostMutation();
  const { data } = useAllCategoriesQuery();
  console.log(data?.data, "datacategory");
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "", // Initialize with id or empty string
    rating: "",
    link: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [createCategory] = useCreateCategoryMutation();
  const [successMessage, setSuccessMessage] = useState(null);

  // Handle category creation
  const handleCreateCategory = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      const res = await createCategory({ categoryName }).unwrap();
      console.log("API Response:", res);
      setSuccessMessage("Category created successfully!");
      setCategoryName(""); // Clear input
      setIsModalOpen(false); // Close modal
      setError(null);
      // Optionally refetch categories or update state
    } catch (error) {
      console.error("API Error:", error);
      setError(error.data?.message || "Failed to create category. Please try again.");
    }
  };

  // Handle input change for item form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a valid image (JPEG, PNG, or GIF)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("Image size must be less than 5MB");
        return;
      }

      setImageFile(file);
      setError(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear selected image
  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Select Option");

  // Handle category selection from dropdown
  const handleCategorySelect = (category) => {
    setSelectedItem(category.categoryName);
    setFormData((prev) => ({
      ...prev,
      category: category._id, 
    }));
    setIsDropdownOpen(false);
  };

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    
    if (!formData.title || !formData.price || !formData.category || !formData.rating || !formData.link) {
      setError("Please fill out all fields");
      return;
    }

    if (!imageFile) {
      setError("Please upload an image");
      return;
    }

    // Create FormData object
    const formDataToSend = new FormData();
    formDataToSend.append(
      "data",
      JSON.stringify({
        title: formData.title,
        price: parseFloat(formData.price),
        category: formData.category,
        rating: parseFloat(formData.rating),
        link: formData.link,
      })
    );
    formDataToSend.append("image", imageFile);

    try {
      const res = await shopsPost(formDataToSend).unwrap();
      console.log("API Response:", res);
      setSuccessMessage("Item added successfully!");
      navigate("/shop");
    } catch (err) {
      console.error("Error posting item:", err);
      setError(err.data?.message || "Failed to add item. Please try again.");
    }
  };

  return (
    <div className="rounded-lg bg-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-[#FFD6D3]">
        <Link to="/shop" className="flex items-center text-[#E64A19] font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Add Item
        </Link>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#E64A19] hover:bg-[#D84315] text-white font-medium py-3 px-8 rounded-xl transition-colors w-full max-w-xs"
          >
            Add Category
          </button>
        </div>
      </header>

      {/* Form */}
      <div className="mx-auto p-4">
        <h1 className="text-xl font-bold mb-6">Add Item</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Image</label>
              <div className="relative">
                {imagePreview ? (
                  <div className="relative w-full h-40 rounded-md overflow-hidden">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <div
                    className="w-full bg-[#FFF8F8] border border-[#FFD6D3] rounded-md p-3 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-gray-500">Select image</span>
                      <Image className="w-5 h-5" />
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      className="hidden"
                      onChange={handleImageSelect}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-[#FFF8F8] border border-[#FFD6D3] rounded-md p-3"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full bg-[#FFF8F8] border border-[#FFD6D3] rounded-md p-3"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <input
                type="number"
                name="rating"
                placeholder="Enter rating"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full bg-[#FFF8F8] border border-[#FFD6D3] rounded-md p-3"
              />
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-medium mb-2">Link</label>
              <input
                type="url"
                name="link"
                placeholder="Paste your link"
                value={formData.link}
                onChange={handleInputChange}
                className="w-full bg-[#FFF8F8] border border-[#FFD6D3] rounded-md p-3"
              />
            </div>

            {/* Category Dropdown */}
                       <div className="flex flex-col gap-2 w-full">
  <label
    htmlFor="category-dropdown"
    className="block text-sm font-medium text-gray-700"
  >
    Category
  </label>
              <button
                type="button"
                className="w-full bg-[#FFF8F8] border border-[#FFD6D3] rounded-md p-3 justify-between px-3 py-3 flex items-center gap-8 relative cursor-pointer dropdown"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedItem}
                <IoChevronDown
                  className={`${
                    isDropdownOpen ? "rotate-[180deg]" : "rotate-0"
                  } transition-all duration-300 text-[1.2rem]`}
                />
                <div
                  className={`${
                    isDropdownOpen
                      ? "z-[1] opacity-100 scale-[1]"
                      : "z-[-1] opacity-0 scale-[0.8]"
                  } w-full absolute top-12 dark:bg-slate-800 left-0 right-0 z-40 bg-[#fff] rounded-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}
                  style={{
                    boxShadow: "0 15px 60px -15px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {data?.data?.map((option) => (
                    <p
                      className="py-2 px-4 bg-[#ececec] transition-all duration-200 flex items-center gap-2"
                      key={option._id}
                      onClick={() => handleCategorySelect(option)}
                    >
                      {option.categoryName}
                    </p>
                  ))}
                </div>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-[#E64A19] hover:bg-[#D84315] text-white font-medium py-3 px-8 rounded-full transition-colors w-full max-w-xs"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Modal for Adding Category */}
      <div
        className={`${
          isModalOpen ? "visible" : "invisible"
        } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#FEF3F0]/80 transition-all duration-300 flex items-center justify-center`}
      >
        <div
          className={`${
            isModalOpen ? "scale-[1] opacity-100" : "scale-[0] opacity-0"
          } w-[90%] sm:w-[80%] md:w-[25%] bg-[#FEF3F0] rounded-lg transition-all px-2 py-6 duration-300 mx-auto mt-8`}
        >
          <div className="flex items-center justify-end px-4">
            <IoClose
              onClick={() => setIsModalOpen(false)}
              className="p-2 text-[2.5rem] text-black dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
            />
          </div>

          <form onSubmit={handleCreateCategory} className="flex flex-col gap-5 p-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category Name</label>
              <input
                type="text"
                name="categoryName"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter Category Name"
                className="py-2 px-3 border dark:border-slate-700 dark:placeholder:text-slate-500 text-black border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 w-full bg-[#E73E1E] text-[#fff] rounded-md"
            >
              Create New Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}