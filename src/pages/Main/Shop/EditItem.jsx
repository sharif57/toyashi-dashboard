
import { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import {
  useShopUpdateMutation,
  useSingleProductQuery,
} from "../../../redux/feature/shopSlice";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function EditItem() {
  const { id } = useParams();
  const [shopUpdate] = useShopUpdateMutation();
  const { data: productData, isLoading } = useSingleProductQuery(id);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    rating: "",
    link: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const IMAGE = import.meta.env.VITE_IMAGE_API;

  useEffect(() => {
    if (productData?.data) {
      const { title, price, category, rating, link, image } = productData.data;
      setFormData({
        title,
        price,
        category: category._id,
        rating,
        link: link || "",
      });
      setImagePreview(`${IMAGE}/${image}`);
    }
  }, [productData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onFinish = async (e) => {
    e.preventDefault();
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

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    } else {
      formDataToSend.append("image", productData?.data?.image);
    }

    try {
      const res = await shopUpdate({ data: formDataToSend, id }).unwrap();
      console.log("Update successful:", res);
      toast.success(res?.message || "Item updated successfully");
      navigate("/shop");
      // Optionally redirect or show success message
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (isLoading) return <p className="text-gray-600">Loading...</p>;
  if (!productData?.data)
    return <p className="text-red-600">Product not found</p>;

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Edit Item</h3>
        <button
          type="button"
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 flex items-center"
          onClick={onFinish}
        >
          <Plus className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <form onSubmit={onFinish} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Title
          </label>
          <input
            type="text"
            name="title"
            className="mt-1 p-2 w-full border rounded-md"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            className="mt-1 p-2 w-full border rounded-md"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <input
            type="number"
            step="0.1"
            name="rating"
            className="mt-1 p-2 w-full border rounded-md"
            value={formData.rating}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            className="mt-1 p-2 w-full border rounded-md"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select Category --</option>
            <option value="6818974edd667f640c378576">Top Sales</option>
            <option value="6818974edd667f640c378577">Top Deals</option>
            <option value="6818974edd667f640c378577">Drinks</option>
            
            {/* You can map more categories here */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Link (Optional)
          </label>
          <input
            type="text"
            name="link"
            className="mt-1 p-2 w-full border rounded-md"
            value={formData.link}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {imagePreview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600">Image Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-[200px] max-h-[200px] mt-2 rounded border"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
