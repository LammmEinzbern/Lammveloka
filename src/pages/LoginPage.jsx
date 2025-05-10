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
      navigate("/admin"); // 🔹 Jika admin, arahkan ke halaman admin
    } else {
      navigate("/"); // 🔹 Jika user biasa, ke halaman utama
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
      <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-500">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Masuk
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-transparent border border-gray-300 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-transparent border border-gray-300 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-300"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 font-semibold"
          >
            {loading ? "Masuk..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-blue-400 font-semibold hover:underline"
          >
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
