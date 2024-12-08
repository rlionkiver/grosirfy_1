import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Fungsi untuk menangani login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kirim permintaan login ke API
      const response = await Axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      // Cek jika login berhasil dan arahkan ke halaman profile
      if (response.status === 200) {
        setMessage("Login berhasil!");

        // Arahkan pengguna ke halaman profile setelah login sukses
        navigate("/profile");
      } else {
        setMessage("Login gagal: " + response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Login gagal!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-[url('/assets/bg.svg')] bg-center bg-cover">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Grosirfy</h1>
        <p className="text-center mb-6">Masuk untuk melanjutkan!</p>

        {/* Form Login */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              placeholder="Masukkan email..."
              className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:ring focus:ring-teal-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Kata Sandi</label>
            <input
              type="password"
              placeholder="Masukkan kata sandi..."
              className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:ring focus:ring-teal-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-teal-500 rounded-lg text-white font-bold hover:bg-teal-600 transition"
          >
            Masuk
          </button>
        </form>

        {/* Tampilkan pesan dari backend */}
        {message && <p className="mt-4 text-center text-gray-400">{message}</p>}

        <div className="mt-6 text-center">
          <p className="text-gray-400">Belum punya akun?</p>
          <a href="/daftar" className="text-teal-500 hover:underline">
            Daftar
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;