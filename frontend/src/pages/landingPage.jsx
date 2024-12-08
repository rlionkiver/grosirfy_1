import React, { useState } from "react";
import Navbar from "../components/navbar/navbar";
import Sidebar from "../components/sideBar/sidebar";
import Footer from "../components/footer/footer";
import { MdOutlineLogin } from "react-icons/md";

const Home = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Beras",
      category: "Makanan",
      price: "50.000",
      entryDate: "2024-12-01",
      quantity: 10,
      unit: "Kg",
      expirationDate: "2025-01-15",
    },
    {
      id: 2,
      name: "Gula Pasir",
      category: "Makanan",
      price: "15.000",
      entryDate: "2024-12-01",
      quantity: 5,
      unit: "Kg",
      expirationDate: "2025-02-20",
    },
    {
      id: 3,
      name: "Minyak Goreng",
      category: "Minuman",
      price: "20.000",
      entryDate: "2024-12-02",
      quantity: 2,
      unit: "Liter",
      expirationDate: "2025-03-10",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    entryDate: "",
    quantity: "",
    unit: "pcs",
    expirationDate: "",
  });

  const [notifications, setNotifications] = useState([]);

  // Date validation function
  const isExpired = (expirationDate) => {
    return new Date(expirationDate) < new Date();
  };

  const isLowStock = (quantity) => {
    return quantity < 5;
  };

  // Filter products for low stock or expired
  const getLowStockOrExpiredProducts = () => {
    return products.filter((product) => 
      isLowStock(product.quantity) || isExpired(product.expirationDate)
    );
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => {
    setNewProduct({
      name: "",
      category: "",
      price: "",
      entryDate: "",
      quantity: "",
      unit: "pcs",
      expirationDate: "",
    });
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    if (
      newProduct.name &&
      newProduct.category &&
      newProduct.price &&
      newProduct.entryDate &&
      newProduct.quantity &&
      newProduct.unit &&
      newProduct.expirationDate
    ) {
      setProducts((prev) => [
        ...prev,
        {
          ...newProduct,
          id: prev.length + 1,
        },
      ]);
      handleModalClose();
    } else {
      alert("Harap isi semua kolom!");
    }
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((prod) => prod.id === productId);
    setNewProduct({ ...productToEdit });
    setIsModalOpen(true);
  };

  const handleUpdateProduct = () => {
    if (
      newProduct.name &&
      newProduct.category &&
      newProduct.price &&
      newProduct.entryDate &&
      newProduct.quantity &&
      newProduct.unit &&
      newProduct.expirationDate
    ) {
      setProducts((prev) =>
        prev.map((prod) =>
          prod.id === newProduct.id ? { ...newProduct } : prod
        )
      );
      handleModalClose();
    } else {
      alert("Harap isi semua kolom!");
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      setProducts((prev) => prev.filter((product) => product.id !== productId));
    }
  };

  // Handle stock update (decrease stock by 1)
  const handleDecreaseStock = (productId) => {
    const productToUpdate = products.find((prod) => prod.id === productId);
    
    if (productToUpdate && productToUpdate.quantity > 0) {
      const updatedProduct = { 
        ...productToUpdate, 
        quantity: productToUpdate.quantity - 1 
      };
      
      setProducts((prev) =>
        prev.map((prod) =>
          prod.id === productId ? updatedProduct : prod
        )
      );
    }
  };

  return (
    <>
      <div className="bg-[#2F3A4B]">
        <Navbar lowStockOrExpiredProducts={getLowStockOrExpiredProducts()} />
      </div>
      <div className="p-4 bg-gray-100 min-h-screen">
        <Sidebar />
        <div className="bg-white shadow-md ml-0 sm:ml-64 rounded-lg p-6 mb-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Daftar Produk</h1>
            <div className="flex gap-4 items-center">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="border px-4 py-2 rounded"
              >
                <option value="">Semua Kategori</option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              <button
                onClick={handleModalOpen}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Tambah Produk
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md ml-0 sm:ml-64 rounded-lg overflow-x-auto">
          <table className="table-auto w-full text-sm text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">No</th>
                <th className="px-4 py-2">Nama Produk</th>
                <th className="px-4 py-2">Kategori</th>
                <th className="px-4 py-2">Harga</th>
                <th className="px-4 py-2">Tanggal Masuk</th>
                <th className="px-4 py-2">Jumlah</th>
                <th className="px-4 py-2">Satuan</th>
                <th className="px-4 py-2">Tanggal Kadaluarsa</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter(
                  (product) =>
                    !selectedCategory || product.category === selectedCategory
                )
                .map((product, index) => (
                  <tr
                    key={product.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } border-b`}
                  >
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{product.name}</td>
                    <td className="px-4 py-2">{product.category}</td>
                    <td className="px-4 py-2">Rp {product.price}</td>
                    <td className="px-4 py-2">{product.entryDate}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`${
                          isLowStock(product.quantity) ? "text-red-500" : ""
                        }`}
                      >
                        {product.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-2">{product.unit}</td>
                    <td
                      className={`px-4 py-2 ${
                        isExpired(product.expirationDate) ? "text-red-500" : ""
                      }`}
                    >
                      {product.expirationDate}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleDecreaseStock(product.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <MdOutlineLogin />
                      </button>
                      <button
                        onClick={() => handleEditProduct(product.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Tambah / Edit Produk</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">
                Nama Produk
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium">
                Kategori
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium">
                Harga
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={newProduct.price}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="entryDate" className="block text-sm font-medium">
                Tanggal Masuk
              </label>
              <input
                type="date"
                name="entryDate"
                id="entryDate"
                value={newProduct.entryDate}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium">
                Jumlah
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={newProduct.quantity}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="unit" className="block text-sm font-medium">
                Satuan
              </label>
              <select
                name="unit"
                id="unit"
                value={newProduct.unit}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded"
              >
                <option value="pcs">PCS</option>
                <option value="kg">Kg</option>
                <option value="liter">Liter</option>
                <option value="dus">Dus</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="expirationDate" className="block text-sm font-medium">
                Tanggal Kadaluarsa
              </label>
              <input
                type="date"
                name="expirationDate"
                id="expirationDate"
                value={newProduct.expirationDate}
                onChange={handleInputChange}
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={newProduct.id ? handleUpdateProduct : handleAddProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {newProduct.id ? "Update Produk" : "Tambah Produk"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
