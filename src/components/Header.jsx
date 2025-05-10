import React from "react";
import { NavLink } from "react-router-dom";
import useAuthStore from "../Auth/AuthStore";

const Header = () => {
  const { user, profile, logout } = useAuthStore();

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 w-full fixed top-0 left-0 z-50 h-16 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-8">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-white hover:text-yellow-300 transition duration-200"
        >
          Lammveloka
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {[
            { to: "/", label: "Beranda" },
            { to: "/destinations", label: "Destinasi Wisata" },
            { to: "/about-us", label: "Tentang Kami" },
            { to: "/contact-us", label: "Kontak Kami" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-semibold border-b-2 border-yellow-300"
                  : "text-white opacity-80 hover:opacity-100 hover:text-yellow-300 transition"
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Admin Panel jika admin */}
          {profile?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-semibold border-b-2 border-yellow-300"
                  : "text-white opacity-80 hover:opacity-100 hover:text-yellow-300 transition"
              }
            >
              Admin Panel
            </NavLink>
          )}

          {/* User Auth Buttons */}
          {user ? (
            <div className="relative group">
              <button className="text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300">
                {profile?.full_name || "Profile"}
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transform transition-all duration-300 origin-top w-40">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </NavLink>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
