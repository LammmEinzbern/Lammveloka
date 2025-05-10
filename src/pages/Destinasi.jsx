import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../utils/SupaWorld";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Destinasi = () => {
  const [destinations, setDestinations] = useState([]);
  const [categories] = useState([
    "Semua",
    "Asia Tenggara",
    "Asia Selatan",
    "Asia Timur",
    "Asia Barat",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      let query = supabase.from("negara_asia").select("*");
      if (selectedCategory !== "Semua") {
        query = query.eq("kategori_tempat", selectedCategory);
      }

      const { data, error } = await query;
      if (error) throw error;
      setDestinations(data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [selectedCategory]);

  const filteredDestinations = destinations.filter((d) =>
    d.nama_tempat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-10">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 animate-pulse rounded-xl shadow-lg overflow-hidden"
        >
          <div className="h-48 bg-gray-300"></div>
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <Header />

        <div className="text-center py-24 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800">
            Destinasi Wisata di Asia
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Temukan berbagai tempat wisata menarik di seluruh penjuru Asia 🌏
          </p>

          {/* Search */}
          <div className="mt-6 flex justify-center">
            <input
              type="text"
              placeholder="Cari destinasi..."
              className="w-full max-w-lg px-5 py-3 border border-blue-300 focus:ring-2 focus:ring-blue-600 rounded-full shadow-md text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Destinasi Grid */}
        <div className="px-6 lg:px-10 pb-16">
          {loading ? (
            renderSkeleton()
          ) : filteredDestinations.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              Destinasi tidak ditemukan.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={destination.foto_wisata}
                      alt={destination.nama_tempat}
                      className="w-full h-48 object-cover hover:blur-sm transition-all duration-300"
                    />
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded shadow-md">
                      {destination.kategori_tempat}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="text-xl font-semibold text-blue-800 hover:text-blue-600 transition">
                      {truncateText(destination.nama_tempat, 15)}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {truncateText(destination.deskripsi_tempat, 100)}
                    </p>
                    <Link
                      to={`/destinations/${destination.id}`}
                      className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                      Telusuri
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Destinasi;
