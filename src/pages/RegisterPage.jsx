import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../Auth/AuthStore";
import Swal from "sweetalert2";

const Register = () => {
  const { register, loading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(email, password, fullName);

    if (!error) {
      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil",
        text: "Silakan login dengan akun Anda.",
        confirmButtonColor: "#2563eb", // Tailwind blue-600
      }).then(() => {
        navigate("/login");
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-blue-900 relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518684079-d8e1ec18d5c8?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 border border-gray-500 rounded-2xl shadow-xl p-8 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Buat Akun Baru
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 bg-white/10 border border-gray-300 text-white rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-white/10 border border-gray-300 text-white rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-white/10 border border-gray-300 text-white rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-bold py-3 rounded-lg shadow-md"
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-blue-400 font-semibold hover:underline"
          >
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
