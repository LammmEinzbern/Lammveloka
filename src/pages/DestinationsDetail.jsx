import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../utils/SupaWorld";
import Header from "../components/Header";
import Skeleton from "react-loading-skeleton";

const DestinasiDetail = () => {
  const { id } = useParams();
  const [destinasi, setDestinasi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // cek tema dari localStorage dan update dark mode serta class di html
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const fetchDestinasi = async () => {
      const { data, error } = await supabase
        .from("negara_asia")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setDestinasi(data);
      setLoading(false);
    };

    fetchDestinasi();
  }, [id]);

  return (
    <div
      className={`min-h-screen py-6 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-b from-gray-100 to-gray-300 text-gray-900"
      }`}
    >
      <Header />
      <div
        className={`max-w-5xl mx-auto rounded-xl shadow-lg overflow-hidden p-4 sm:p-6 lg:p-8 space-y-6 mt-20 transition-colors duration-500 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Gambar Utama */}
        <div>
          {loading ? (
            <Skeleton height={256} className="w-full rounded-xl" />
          ) : (
            <img
              src={
                destinasi?.foto_wisata || "https://via.placeholder.com/600x300"
              }
              alt={destinasi?.nama_tempat}
              className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-xl"
            />
          )}
        </div>

        {/* Informasi Umum */}
        <div className="space-y-2">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            {loading ? <Skeleton width={300} /> : destinasi?.nama_tempat}
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {loading ? <Skeleton count={3} /> : destinasi?.deskripsi_tempat}
          </p>
          <div
            className={`space-y-1 text-sm sm:text-base ${
              darkMode ? "text-gray-400" : "text-gray-700"
            }`}
          >
            <p>
              <strong>Negara:</strong>{" "}
              {loading ? <Skeleton width={120} /> : destinasi?.nama_negara}
            </p>
            <p>
              <strong>Kategori:</strong>{" "}
              {loading ? <Skeleton width={150} /> : destinasi?.kategori_tempat}
            </p>
          </div>

          {loading ? (
            <Skeleton width={200} height={20} />
          ) : (
            destinasi?.link && (
              <a
                href={destinasi.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 inline-block hover:underline ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                🌐 Kunjungi Website Resmi
              </a>
            )
          )}
        </div>

        {/* Tempat Alam 1 */}
        {loading ? (
          <div>
            <Skeleton height={24} width={240} />
            <Skeleton height={208} className="w-full my-2 rounded" />
            <Skeleton count={2} />
          </div>
        ) : (
          destinasi?.tempat_alam && (
            <div
              className={`border-t pt-6 space-y-2 ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <h3
                className={`text-xl sm:text-2xl font-semibold ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                🏞️ {destinasi.tempat_alam}
              </h3>
              {destinasi.foto_alam && (
                <img
                  src={destinasi.foto_alam}
                  alt={destinasi.tempat_alam}
                  className="w-full h-40 sm:h-52 md:h-60 object-cover rounded-md"
                />
              )}
              <p
                className={`text-sm sm:text-base ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {destinasi.deskripsi_alam}
              </p>
            </div>
          )
        )}

        {/* Tempat Alam 2 */}
        {loading ? (
          <div>
            <Skeleton height={24} width={240} />
            <Skeleton height={208} className="w-full my-2 rounded" />
            <Skeleton count={2} />
          </div>
        ) : (
          destinasi?.tempat_alam2 && (
            <div
              className={`border-t pt-6 space-y-2 ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <h3
                className={`text-xl sm:text-2xl font-semibold ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                🏞️ {destinasi.tempat_alam2}
              </h3>
              {destinasi.foto_alam2 && (
                <img
                  src={destinasi.foto_alam2}
                  alt={destinasi.tempat_alam2}
                  className="w-full h-40 sm:h-52 md:h-60 object-cover rounded-md"
                />
              )}
              <p
                className={`text-sm sm:text-base ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {destinasi.deskripsi_alam2}
              </p>
            </div>
          )
        )}

        {/* Tombol Kembali */}
        <div className="pt-6">
          <Link
            to="/destinations"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ← Kembali ke Daftar Destinasi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinasiDetail;
