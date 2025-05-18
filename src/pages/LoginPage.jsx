import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../Auth/AuthStore";

const Login = () => {
  const { login, loading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const role = await login(email, password);

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#00c6ff] to-[#0072ff] px-6">
      <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-10 flex flex-col">
        <h2 className="text-4xl font-bold text-blue-700 mb-8 text-center tracking-tight">
          Lammveloka
        </h2>

        <p className="text-center text-gray-600 mb-6 font-semibold">
          Selamat datang! Silakan masuk untuk melanjutkan.
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 text-center rounded-md py-2 mb-6 font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
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
            {loading ? "Masuk..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-700 mt-8 text-sm">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
