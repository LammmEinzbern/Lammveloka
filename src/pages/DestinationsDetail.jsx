import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../utils/SupaWorld";
import Header from "../components/Header";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DestinasiDetail = () => {
  const { id } = useParams();
  const [destinasi, setDestinasi] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 py-6 px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg dark:shadow-black/40 overflow-hidden p-4 sm:p-6 lg:p-8 space-y-6 mt-20">
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
          <h2 className="text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl font-bold">
            {loading ? <Skeleton width={300} /> : destinasi?.nama_tempat}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg">
            {loading ? <Skeleton count={3} /> : destinasi?.deskripsi_tempat}
          </p>
          <div className="text-gray-800 dark:text-gray-400 space-y-1 text-sm sm:text-base">
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
                className="text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
              >
                🌐 Kunjungi Website Traveloka
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
            <div className="border-t border-gray-300 dark:border-gray-700 pt-6 space-y-2">
              <h3 className="text-gray-900 dark:text-gray-100 text-xl sm:text-2xl font-semibold">
                {destinasi.tempat_alam}
              </h3>
              {destinasi.foto_alam && (
                <img
                  src={destinasi.foto_alam}
                  alt={destinasi.tempat_alam}
                  className="w-full h-40 sm:h-52 md:h-60 object-cover rounded-md"
                />
              )}
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
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
            <div className="border-t border-gray-300 dark:border-gray-700 pt-6 space-y-2">
              <h3 className="text-gray-900 dark:text-gray-100 text-xl sm:text-2xl font-semibold">
                {destinasi.tempat_alam2}
              </h3>
              {destinasi.foto_alam2 && (
                <img
                  src={destinasi.foto_alam2}
                  alt={destinasi.tempat_alam2}
                  className="w-full h-40 sm:h-52 md:h-60 object-cover rounded-md"
                />
              )}
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                {destinasi.deskripsi_alam2}
              </p>
            </div>
          )
        )}

        {/* Tombol Kembali */}
        <div className="pt-6">
          <Link
            to="/destinations"
            className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            ← Kembali ke Daftar Destinasi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinasiDetail;
