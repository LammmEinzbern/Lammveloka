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
        confirmButtonColor: "#2563eb",
      }).then(() => {
        navigate("/login");
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#00c6ff] to-[#0072ff] px-6">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-10 flex flex-col relative">
        <h2 className="text-4xl font-bold text-blue-700 mb-8 text-center tracking-tight">
          Lammveloka
        </h2>

        <p className="text-center text-gray-600 mb-6 font-semibold">
          Buat akun baru untuk mulai menjelajah!
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 text-center rounded-md py-2 mb-6 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition placeholder-gray-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition placeholder-gray-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition placeholder-gray-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300 disabled:opacity-60"
          >
            {loading ? "Mendaftar..." : "Daftar"}
          </button>
        </form>

        <p className="text-center text-gray-700 mt-8 text-sm">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
