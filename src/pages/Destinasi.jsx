import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaWorld";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Destinasi = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  const categories = [
    "Semua",
    "Asia Tenggara",
    "Asia Timur",
    "Asia Selatan",
    "Asia Tengah",
    "Asia Barat",
    "Asia Utara",
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      let query = supabase
        .from("negara_asia")
        .select("*", { count: "exact" })
        .range(from, to);

      if (selectedCategory !== "Semua") {
        query = query.eq("kategori_tempat", selectedCategory);
      }

      const { data, count, error } = await query;
      if (error) throw error;

      const filteredData = data.filter((dest) =>
        dest.nama_tempat?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setDestinations(filteredData);
      setTotalItems(count);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [selectedCategory, currentPage, searchQuery]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 min-h-screen flex">
      <Header />
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <div className="flex-1 lg:ml-64 py-16 px-6 mt-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
          Destinasi Populer
        </h2>

        {/* 🔍 Search */}
        <div className="mb-6 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Cari destinasi..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* ✅ Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <Skeleton height={192} width="100%" />
                <div className="p-4">
                  <Skeleton height={24} width="80%" />
                  <Skeleton
                    height={16}
                    width="100%"
                    style={{ marginTop: "8px" }}
                  />
                  <Skeleton height={16} width="90%" />
                </div>
              </div>
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Tidak ada data ditemukan.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => navigate(`/destinations/${dest.id}`)}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl cursor-pointer transition duration-300"
                >
                  <img
                    src={
                      dest.foto_wisata ||
                      "https://via.placeholder.com/400x200?text=No+Image"
                    }
                    alt={dest.nama_tempat}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {truncateText(dest.nama_tempat, 20)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                      {truncateText(dest.deskripsi_tempat || "", 100)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 🌐 Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Destinasi;
