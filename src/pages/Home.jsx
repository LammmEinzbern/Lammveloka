import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../utils/SupaWorld";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-300 dark:bg-gray-600"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
    </div>
  </div>
);

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const fetchDestinations = async () => {
    try {
      const { data, error } = await supabase.from("negara_asia").select("*");
      if (error) throw error;
      setDestinations(data);
    } catch (error) {
      console.error("Gagal ambil data destinasi:", error.message);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_us")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setFeedbacks(data);
    } catch (error) {
      console.error("Gagal ambil feedback:", error.message);
    }
  };

  useEffect(() => {
    fetchDestinations();
    fetchFeedbacks();
  }, []);

  return (
    <div className="font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <Helmet>
        <title>Beranda - Jelajah Asia</title>
        <meta name="description" content="Temukan destinasi terbaik di Asia" />
      </Helmet>

      <Header />

      {/* Hero Swiper */}
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] pt-10 overflow-hidden">
        {loading ? (
          <div className="text-gray-900 dark:text-gray-100 text-center mt-40 opacity-0 animate-pulse">
            Loading...
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            loop
            autoplay={{ delay: 4000 }}
            className="w-full h-full"
          >
            {destinations.map((dest) => (
              <SwiperSlide key={dest.id}>
                <div className="relative w-full h-full">
                  <img
                    src={dest.foto_wisata}
                    alt={dest.nama_tempat}
                    className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 ease-in-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                  <div
                    className={`relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4
                      transition-opacity duration-700 ease-in-out
                      ${loaded ? "opacity-100" : "opacity-0"}
                      transform ${loaded ? "translate-y-0" : "translate-y-6"}
                    `}
                  >
                    <h1 className="text-2xl sm:text-4xl font-bold">
                      {dest.nama_tempat}
                    </h1>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* Video Section */}
      <section className="bg-gray-800 dark:bg-gray-800 text-white py-16 px-4 text-center">
        <h2
          className={`text-2xl sm:text-3xl font-bold mb-6
            transition-opacity duration-700 ease-in-out
            ${loaded ? "opacity-100" : "opacity-0"}
            transform ${loaded ? "translate-y-0" : "translate-y-6"}
          `}
        >
          Video Perjalanan Asia
        </h2>
        <div
          className={`w-full max-w-4xl mx-auto aspect-video
            transition-opacity duration-700 ease-in-out
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
        >
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/wEHQlI2BYRU?autoplay=1&mute=1&loop=1&playlist=wEHQlI2BYRU"
            title="Travel Video"
            frameBorder="0"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Destinasi Populer */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800 px-4">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-8
              transition-opacity duration-700 ease-in-out
              ${loaded ? "opacity-100" : "opacity-0"}
              transform ${loaded ? "translate-y-0" : "translate-y-6"}
            `}
          >
            Destinasi Populer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
              : destinations.slice(0, 6).map((dest) => (
                  <div
                    key={dest.id}
                    className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl duration-300 cursor-pointer"
                  >
                    <img
                      src={dest.foto_wisata}
                      alt={dest.nama_tempat}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
                        {dest.nama_tempat}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 text-sm sm:text-base">
                        {dest.deskripsi_tempat}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 dark:bg-blue-700 text-white text-center px-4">
        <h2
          className={`text-2xl sm:text-3xl font-bold mb-4
            transition-opacity duration-700 ease-in-out
            ${loaded ? "opacity-100" : "opacity-0"}
            transform ${loaded ? "translate-y-0" : "translate-y-6"}
          `}
        >
          Ayo Jelajahi Dunia!
        </h2>
        <p
          className={`max-w-2xl mx-auto mb-6 text-base sm:text-lg
            transition-opacity duration-700 ease-in-out
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
        >
          Bergabunglah bersama kami dan temukan keindahan destinasi Asia.
        </p>
        <Link
          to={"/login"}
          className="bg-white text-blue-600 font-bold py-3 px-6 sm:px-8 rounded-lg shadow hover:bg-gray-100 transition duration-300 inline-block"
        >
          Mulai Sekarang
        </Link>
      </section>

      {/* Feedback Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className={`text-2xl sm:text-3xl font-bold mb-10
              transition-opacity duration-700 ease-in-out
              ${loaded ? "opacity-100" : "opacity-0"}
              transform ${loaded ? "translate-y-0" : "translate-y-6"}
            `}
          >
            Apa Kata Mereka?
          </h2>
          {feedbacks.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              Belum ada feedback.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.slice(0, 6).map((fb, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-transform hover:scale-105 duration-300"
                >
                  <p className="text-sm sm:text-base italic mb-4 text-gray-700 dark:text-gray-300">
                    "{fb.message}"
                  </p>
                  <hr className="border-gray-300 dark:border-gray-700 mb-2" />
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                    - {fb.nama} ({fb.email})
                  </h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
