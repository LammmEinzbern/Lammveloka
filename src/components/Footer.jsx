import React from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Lammveloka</h1>
          <p className="text-gray-400">
            Jelajahi indahnya dunia Asia bersama Lammveloka.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Link Cepat</h2>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/destinations" className="hover:text-white transition">
                Destinasi Wisata
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-white transition">
                Tentang Lammveloka
              </Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-white transition">
                Kontak Kami
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Ikuti Kami</h2>
          <div className="flex space-x-5 text-gray-400">
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram size={22} />
            </a>
            <a href="#" className="hover:text-blue-600 transition">
              <FaFacebook size={22} />
            </a>
            <a href="#" className="hover:text-sky-400 transition">
              <FaTwitter size={22} />
            </a>
            <a href="#" className="hover:text-red-600 transition">
              <FaYoutube size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        &copy; 2024 <span className="font-medium">Lammveloka</span>. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
