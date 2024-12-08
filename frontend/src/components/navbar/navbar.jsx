import React, { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";

const Navbar = ({ lowStockOrExpiredProducts = [] }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  // Handle profile
  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="flex items-center justify-between h-[100px] ml-0 sm:ml-64 p-4 bg-[#2F3A4B] mb-5">
      {/* Search Bar */}
      <div className="flex items-center w-full max-w-lg">
        <input
          type="text"
          placeholder="Cari sesuatu..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <RiSearch2Line className="ml-2 text-white" />
      </div>

      {/* Notification Button */}
      <div className="relative flex items-center">
        <button
          onClick={() => setIsNotificationOpen(true)}
          className={`flex items-center justify-center mr-5 p-2 rounded-full text-white focus:outline-none transition ${
            lowStockOrExpiredProducts?.length > 0
              ? "bg-red-500"
              : "bg-[#1ABC9C]"
          } hover:bg-[#16A085]`}
        >
          <IoIosNotificationsOutline size={24} />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
  <button
    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
    className="flex items-center text-2xl justify-center p-2 rounded-[5px] bg-[#1ABC9C] hover:bg-[#16A085] text-white focus:outline-none transition"
  >
    <VscAccount />
  </button>
  {isProfileDropdownOpen && (
    <div
      className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50"
      style={{ top: "calc(100% + 0.5rem)" }} // Pastikan dropdown muncul di bawah tombol
    >
      <ul className="py-2 text-gray-700">
        <li>
          <button
            onClick={handleProfile}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Profil
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )}
</div>
      </div>

      {/* Notification Modal */}
      {isNotificationOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-red-500 mb-4">
              Notifikasi Produk
            </h2>
            <ul className="text-gray-700">
              {lowStockOrExpiredProducts?.length > 0 ? (
                lowStockOrExpiredProducts.map((product, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-semibold">{product.name}</span>:{" "}
                    {product.quantity} unit tersisa{" "}
                    <span
                      className={`ml-2 ${
                        new Date(product.expirationDate) <= new Date()
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      Kadaluarsa pada{" "}
                      {new Date(product.expirationDate).toLocaleDateString()}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-green-500">Semua produk aman!</li>
              )}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsNotificationOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
