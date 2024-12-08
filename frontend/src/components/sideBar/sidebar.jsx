// File: components/sideBar/sidebar.jsx
import React from "react";
import { FaHistory } from "react-icons/fa";
import { BsBoxSeam } from "react-icons/bs";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-[#2F3A4B] text-white shadow-md z-50">
      <div className="p-6 flex flex-col items-center font-bold">
        {/* Logo */}
        <img className="w-40 mb-4" src="/assets/h1-grosirfy.svg" alt="Logo" />

        {/* Divider */}
        <hr className="w-full border-gray-500 mb-6" />

        {/* Buttons */}
        <Link to="/" className="bg-gradient-to-r from-[#1ABC9C] to-[#16A085] text-white flex items-center justify-center w-full mb-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:from-[#16A085] hover:to-[#1ABC9C]">
          <BsBoxSeam className="text-2xl mr-2" />
          <span>Semua Produk</span>
        </Link>

        <Link to="/riwayat-pengisian" className="bg-gradient-to-r from-[#1ABC9C] to-[#16A085] text-white flex items-center justify-center w-full py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:from-[#16A085] hover:to-[#1ABC9C]">
          <FaHistory className="mr-2" />
          <span>Riwayat</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
