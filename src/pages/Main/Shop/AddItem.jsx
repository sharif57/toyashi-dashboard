import { useState, useRef } from "react";
import { ArrowLeft, Image, X } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useShopsPostMutation } from "../../../redux/feature/shopSlice";

export default function AddItem() {
  const navigate = useNavigate();
  const {id} = useParams();
  console.log(id, 'id')
  const [shopsPost] = useShopsPostMutation();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: id,
    rating: "",
    link: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Optional: Validate file type and size
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a valid image (JPEG, PNG, or GIF)");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError("Image size must be less than 5MB");
        return;
      }

      setImageFile(file);
      setError(null);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);

  //   // Validate form data
  //   if (!formData.title || !formData.price || !formData.category || !formData.rating || !formData.link) {
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
  //     category: formData.id,
  //     rating: parseFloat(formData.rating),
  //     link: formData.link,
  //   }));
  //   formDataToSend.append("image", imageFile);

  //   try {
  //     const res = await shopsPost(formDataToSend, id).unwrap(); // Use unwrap to handle RTK Query response
  //     console.log("API Response:", res);
  //     // navigate("/shop"); // Navigate back to shop page on success
  //   } catch (err) {
  //     console.error("Error posting item:", err);
  //     setError("Failed to add item. Please try again.");
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  // Validate form data
  if (!formData.title || !formData.price || !formData.rating || !formData.link) {
    setError("Please fill out all fields");
    return;
  }

  if (!imageFile) {
    setError("Please upload an image");
    return;
  }

  // Create FormData object
  const formDataToSend = new FormData();
  formDataToSend.append("data", JSON.stringify({
    title: formData.title,
    price: parseFloat(formData.price),
    category: id, // Use the id from params directly
    rating: parseFloat(formData.rating),
    link: formData.link,
  }));
  formDataToSend.append("image", imageFile);

  try {
    const res = await shopsPost(formDataToSend).unwrap();
    console.log("API Response:", res);
    navigate("/shop"); // Uncomment this when ready
  } catch (err) {
    console.error("Error posting item:", err);
    setError(err.data?.message || "Failed to add item. Please try again.");
  }
};
  return (
    <div className="rounded-lg bg-white">
      {/* Header */}
      <header className="flex items-center p-4 border-b border-[#FFD6D3]">
        <Link
          to="/shop"
          className="flex items-center text-[#E64A19] font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Add Item
        </Link>
      </header>

      {/* Form */}
      <div className="mx-auto p-4">
        <h1 className="text-xl font-bold mb-6">Add Item</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Image</label>
              <div className="relative">
                {imagePreview ? (
                  <div className="relative w-full h-40 rounded-md overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
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

            {/* Category */}
            {/* <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-[#FFF8F8] border border-[#FFD6D3] rounded-md p-3 appearance-none"
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="top-sales">Top Sales</option>
                <option value="drinks">Drinks</option>
                <option value="shortlist">Shortlist</option>
              </select>
            </div> */}

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
    </div>
  );
}