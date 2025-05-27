import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuthStore from "../Auth/AuthStore";

const Header = () => {
  const { user, profile, logout } = useAuthStore();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 w-full fixed top-0 left-0 z-50 h-16 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-4 md:px-8">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-white hover:text-yellow-300 transition duration-200"
        >
          Lammveloka
        </NavLink>

        {/* Hamburger for Mobile */}
        <button
          onClick={toggleMobileNav}
          className="lg:hidden text-white focus:outline-none"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
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

          <button
            onClick={toggleTheme}
            className="text-white bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700 transition"
            aria-label="Toggle Dark/Light Mode"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>

          {user ? (
            <div className="relative group">
              <button className="text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300">
                {profile?.full_name || "Profile"}
              </button>
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transform transition-all duration-300 origin-top w-40">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </NavLink>
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

      {/* Mobile Navigation Menu */}
      {isMobileNavOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-blue-800 text-white px-4 py-4 space-y-3 z-40 shadow-lg">
          {[
            { to: "/", label: "Beranda" },
            { to: "/destinations", label: "Destinasi Wisata" },
            { to: "/about-us", label: "Tentang Kami" },
            { to: "/contact-us", label: "Kontak Kami" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMobileNav}
              className={({ isActive }) =>
                isActive
                  ? "block font-semibold text-yellow-300"
                  : "block hover:text-yellow-300"
              }
            >
              {link.label}
            </NavLink>
          ))}

          {profile?.role === "admin" && (
            <NavLink
              to="/admin"
              onClick={closeMobileNav}
              className={({ isActive }) =>
                isActive
                  ? "block font-semibold text-yellow-300"
                  : "block hover:text-yellow-300"
              }
            >
              Admin Panel
            </NavLink>
          )}

          <button
            onClick={() => {
              toggleTheme();
              closeMobileNav();
            }}
            className="block w-full text-left bg-gray-700 px-3 py-2 rounded hover:bg-gray-600"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>

          {user ? (
            <>
              <NavLink
                to="/profile"
                onClick={closeMobileNav}
                className="block px-3 py-2 hover:text-yellow-300"
              >
                Profile
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  closeMobileNav();
                }}
                className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={closeMobileNav}
              className="block bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
