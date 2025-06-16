import { Card, Typography } from "antd";
import { StarFilled } from "@ant-design/icons";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  useAllShopsQuery,
  useDeleteProductsMutation,
} from "../../../redux/feature/shopSlice";
import Swal from "sweetalert2";

const { Title, Text } = Typography;

export default function ProductListing() {
  

  const {
    data: shopData,
    isLoading,
    refetch,
  } = useAllShopsQuery({
 
  });
  const [deleteProducts] = useDeleteProductsMutation();

  const IMAGE = import.meta.env.VITE_IMAGE_API;

  // Extract unique categories from API data
  const categories = [
    ...new Map(
      shopData?.data?.map((item) => [
        item?.category?._id,
        { id: item?.category?._id, name: item?.category?.categoryName },
      ])
    ).values(),
  ];

  // Transform API data into product format
  const products =
    shopData?.data?.map((item) => ({
      id: item?._id,
      title: item.title,
      price: item.price,
      rating: item.rating,
      image: item.image,
      category: item?.category?._id, // Map to category ID
    })) || [];

  // Filter products by price
  const filteredProducts = products.filter(
    (product) => product.price 
  );

  // Handle edit product

  // Handle delete product
  const handleDeleteProduct = async (product) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const res = await deleteProducts(product.id);
        if (res.data) {
          Swal.fire("Deleted!", "Product has been deleted.", "success");
        }
        refetch();
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to delete product.", "error");
    }
  };

  
  // Custom styles
  const customStyles = {
    primaryColor: "#E64A19",
    primaryColorHover: "#D84315",
    cardShadow: "0 1px 3px rgba(0,0,0,0.1)",
    cardShadowHover: "0 4px 6px rgba(0,0,0,0.1)",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "16px 24px",
      }}
    >
      {/* Header with Add New Item button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Product Listing
        </Title>
       
      </div>

      {/* Categories and Products */}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : categories.length === 0 ? (
        <Text>No products available.</Text>
      ) : (
        categories.map((category) => {
          const categoryProducts = filteredProducts.filter(
            (product) => product.category === category?.id
          );

          if (categoryProducts.length === 0) return null;

          return (
            <div key={category.id} style={{ marginBottom: "32px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Title level={4} style={{ margin: 0 }}>
                  {category.name}
                </Title>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "16px",
                }}
              >
                {categoryProducts.map((product) => (
                  <Card
                    key={product.id}
                    hoverable
                    cover={
                      <div style={{ height: "128px", overflow: "hidden" }}>
                        <img
                          alt={product.title}
                          src={
                            `${IMAGE}/${product.image}` || "/placeholder.svg"
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    }
                    bodyStyle={{ padding: "12px" }}
                    style={{
                      boxShadow: customStyles.cardShadow,
                      transition: "box-shadow 0.3s ease",
                    }}
                  >
                    <div style={{ height: "40px", marginBottom: "8px" }}>
                      <Text
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.title}
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: customStyles.primaryColor,
                        }}
                      >
                        ${product.price}
                      </Text>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <StarFilled
                          style={{
                            fontSize: "12px",
                            color: "#FADB14",
                            marginRight: "4px",
                          }}
                        />
                        <Text style={{ fontSize: "12px", color: "#666" }}>
                          {product.rating}
                        </Text>
                      </div>
                    </div>
                    <div className="flex justify-between gap-2">
                      <button
                        onClick={() => handleDeleteProduct(product)}
                        className="flex-1 px-3 py-1 text-white bg-red hover:bg-red-600 rounded-md transition-colors duration-200"
                      >
                        Delete
                      </button>
                      <Link to={`/shop/${product.id}`}>
                        {" "}
                        <button className="flex-1 px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors duration-200">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
              <Link
                // to={"/add-item"}
                 to={`/add-item/${category.id}`}
                className="bg-orange-500 w-1/6 mt-5 text-center mx-auto hover:bg-orange-600 text-white rounded-full px-6 py-2 flex items-center transition-colors duration-200"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Item
              </Link>
            </div>
          );
        })
      )}

      

    </div>
  );
}
