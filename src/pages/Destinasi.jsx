import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaWorld";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Destinasi = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

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
    setShowSidebar(false);
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

      if (searchQuery.trim() !== "") {
        query = query.ilike("nama_tempat", `%${searchQuery}%`);
      }

      const { data, count, error } = await query;
      if (error) throw error;

      setDestinations(data);
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
    <section className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-1/5">
        <div className="md:block hidden">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </div>

        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Destinasi</h2>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>

        {showSidebar && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg p-4">
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="md:w-4/5 w-full flex flex-col">
        <Header />

        <div className="flex-1 py-10 px-4 sm:px-6 md:px-8 mt-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
            Destinasi Wisata
          </h2>

          {/* Search Input */}
          <div className="mb-6 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Cari destinasi..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm
                         focus:outline-none focus:ring focus:border-blue-400
                         dark:bg-gray-800 dark:text-white transition"
            />
          </div>

          {/* Cards */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: itemsPerPage }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-300 dark:bg-gray-600 w-full"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((dest) => (
                  <div
                    key={dest.id}
                    onClick={() => navigate(`/destinations/${dest.id}`)}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer
                               hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out"
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
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">
                        {truncateText(dest.nama_tempat, 20)}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                        {truncateText(dest.deskripsi_tempat || "", 100)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center mt-8 gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white
                               hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors duration-200"
                  >
                    Prev
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-1 rounded transition-colors duration-200 ${
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
                    className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white
                               hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Destinasi;
