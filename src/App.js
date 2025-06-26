import React, { useState } from "react";
import productsData from "./products";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredProducts = productsData
    .filter((product) =>
      filterCategory === "All" ? true : product.category === filterCategory
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "name") return a.name.localeCompare(b.name);
      if (sortOption === "price") return a.price - b.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
           Our Products 🛒
        </h1>

         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products...🔍"
            className="p-2 rounded border border-gray-300 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="p-2 rounded border border-gray-300 shadow-sm"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Fruits"> Fruits 🍎</option>
            <option value="Vegetables">Vegetables 🥦</option>
          </select>

          <select
            className="p-2 rounded border border-gray-300 shadow-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="name">Name (A-Z) 🔤</option>
            <option value="price">Price (Low to High) 💰</option>
          </select>
        </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl p-4 shadow hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-indigo-600 font-bold">{product.price}</p>
              </div>
            ))
          ) : (
            <p className="col-span-2 text-center text-gray-600">
              No products found.❌
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
