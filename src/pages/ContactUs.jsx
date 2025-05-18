import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({ nama: "", email: "", pesan: "" });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesan berhasil dikirim!");
    console.log("Form Terkirim", formData);
    setFormData({ nama: "", email: "", pesan: "" });
  };

  return (
    <main
      className={`min-h-screen mt-16 bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 dark:from-gray-900 dark:to-gray-800 dark:text-gray-200 transition-colors duration-300`}
    >
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
          Hubungi Kami
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12">
          Ada pertanyaan? Silakan isi formulir di bawah ini atau hubungi kami.
        </p>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2 space-y-6 text-blue-700 dark:text-blue-400">
            <div>
              <h4 className="font-semibold">Alamat</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Jl. Celepuk 2 no 45, Jatimakmur, Pondok Gede, Bekasi
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Telepon</h4>
              <p className="text-gray-600 dark:text-gray-400">
                <a href="tel:+6285824697925" className="hover:underline">
                  +62 858 2469 7925
                </a>
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-gray-600 dark:text-gray-400">
                <a
                  href="mailto:kontak@lammshoppedia.com"
                  className="hover:underline"
                >
                  kontak@lammshoppedia.com
                </a>
              </p>
            </div>
          </div>

          {/* Formulir */}
          <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transition-colors duration-300">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-blue-600 dark:text-blue-400 mb-1"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-blue-600 dark:text-blue-400 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="pesan"
                  className="block text-sm font-medium text-blue-600 dark:text-blue-400 mb-1"
                >
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>

        {/* Google Maps */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1663022.0210172555!2d138.4502452987295!3d35.50205559395694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x605d1b87f02e57e7%3A0x2e01618b22571b89!2sTokyo%2C%20Jepang!5e0!3m2!1sid!2sid!4v1736127334829!5m2!1sid!2sid"
          className="w-full h-96 mt-12 rounded-lg shadow-lg"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps lokasi"
        ></iframe>
      </div>
      <Footer />
    </main>
  );
};

export default ContactUs;
