import React, { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';

const ProfileEditForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(true); // Untuk menangani status loading
  const [error, setError] = useState(null); // Untuk menangani error

  // Fetch data dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
        if (!token) {
          setError('Authentication token is missing');
          setLoading(false);
          return;
        }

        // Mengirim request dengan Authorization token
        const response = await axios.get('http://127.0.0.1:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Menyertakan token dalam header
          }
        });

        console.log('API Response:', response);  // Debugging untuk melihat data dari API

        // Periksa apakah data ada dan sesuai
        setFormData({
          fullName: response.data.fullName || '',
          email: response.data.email || '',
          password: response.data.password || '',
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);  // Menangani error
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Efek dijalankan hanya sekali saat komponen dimuat

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi untuk menyimpan data
  const handleSave = () => {
    console.log('Data saved:', formData);
    setIsEditing(false);
    // Anda bisa menambahkan request POST di sini untuk menyimpan data ke server
  };

  // Fungsi untuk membatalkan edit
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Fungsi untuk mengaktifkan mode edit
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Menampilkan loading saat data sedang di-fetch
  if (loading) {
    return <div>Loading...</div>;
  }

  // Menampilkan error jika terjadi masalah saat fetch data
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[100%] max-w-[65%] bg-[#1ABC9C] p-6 ml-[15%] rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-white">Personal Information</h1>
          {!isEditing && (
            <button
              onClick={handleEditClick}
              className="text-white hover:text-gray-200 transition cursor-pointer"
            >
              <FiEdit size={24} />
            </button>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-4 text-white">
          {/* Full Name */}
          <div>
            <p className="text-sm">Full Name</p>
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 text-black rounded-md focus:outline-none"
              />
            ) : (
              <p className="text-lg font-medium">{formData.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <p className="text-sm">Email</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 text-black rounded-md focus:outline-none"
              />
            ) : (
              <p className="text-lg font-medium">{formData.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <p className="text-sm">Password</p>
            {isEditing ? (
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 text-black rounded-md focus:outline-none"
              />
            ) : (
              <p className="text-lg font-medium">{formData.password}</p>
            )}
          </div>
        </div>

        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileEditForm;
