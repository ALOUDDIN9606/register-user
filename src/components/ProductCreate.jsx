import { request } from "@/api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductCreate = () => {
  const token = useSelector((s) => s.token.value);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    request.get("/product-category/get").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const product = Object.fromEntries(formData);

    product.price = +product.price;
    product.categoryId = +product.categoryId;
    product.stock = +product.stock;
    product.average_rating = 0;

    request.post("/product/create", product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r bg-slate-500 text-white shadow-lg rounded-xl mt-12">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Create a New Product
      </h2>
      <form onSubmit={handleCreateProduct} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Product Name</label>
          <input
            className="border-2 border-transparent rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
            type="text"
            name="name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="border-2 border-transparent rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
            name="description"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Price</label>
          <input
            className="border-2 border-transparent rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
            type="number"
            name="price"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            className="border-2 border-transparent rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
            type="text"
            name="image"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            className="border-2 border-transparent rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
            name="categoryId"
            required
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Stock Quantity
          </label>
          <input
            className="border-2 border-transparent rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
            type="number"
            name="stock"
            required
          />
        </div>

        <button className="w-full bg-violet-900 text-white font-semibold rounded-md py-3 hover:bg-yellow-300 transition duration-300">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
