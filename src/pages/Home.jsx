import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { supabase } from "../utils/SupaWorld";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Helmet } from "react-helmet";

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

  const fetchDestinations = async () => {
    try {
      const { data, error } = await supabase.from("negara_asia").select("*");
      if (error) throw error;
      setDestinations(data);
    } catch (error) {
      console.error("Gagal ambil data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div className="font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <Helmet>
        <title>Lammveloka – Jelajahi Destinasi Wisata Asia</title>
        <meta
          name="description"
          content="Temukan destinasi wisata terbaik di Asia, tonton video perjalanan, dan rencanakan petualanganmu bersama Lammveloka."
        />
        <meta
          name="keywords"
          content="wisata Asia, travel Asia, destinasi Asia, kuliner Asia, festival Asia"
        />

        <link rel="canonical" href="https://lammveloka.example.com/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lammveloka.example.com/" />
        <meta
          property="og:title"
          content="Lammveloka – Jelajahi Destinasi Wisata Asia"
        />
        <meta
          property="og:description"
          content="Temukan destinasi wisata terbaik, video perjalanan, dan tips eksplorasi Asia di Lammveloka."
        />
        <meta
          property="og:image"
          content="https://lammveloka.example.com/og-image.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Lammveloka" />
        <meta
          name="twitter:title"
          content="Lammveloka – Jelajahi Destinasi Wisata Asia"
        />
        <meta
          name="twitter:description"
          content="Jelajahi tempat-tempat menakjubkan di Asia dengan Lammveloka."
        />
        <meta
          name="twitter:image"
          content="https://lammveloka.example.com/twitter-image.jpg"
        />
      </Helmet>

      <Header />

      {/* Hero Swiper */}
      <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] pt-10 overflow-hidden">
        {loading ? (
          <div className="text-gray-900 dark:text-gray-100 text-center mt-40">
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
                    className="absolute inset-0 w-full h-full object-cover z-0"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                  <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
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
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Video Perjalanan Asia
        </h2>
        <div className="w-full max-w-4xl mx-auto aspect-video">
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-8">
            Destinasi Populer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
              : destinations.slice(0, 6).map((dest) => (
                  <div
                    key={dest.id}
                    className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
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
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Ayo Jelajahi Dunia!
        </h2>
        <p className="max-w-2xl mx-auto mb-6 text-base sm:text-lg">
          Bergabunglah bersama kami dan temukan keindahan destinasi Asia.
        </p>
        <button className="bg-white text-blue-600 font-bold py-3 px-6 sm:px-8 rounded-lg shadow hover:bg-gray-100 transition">
          Mulai Sekarang
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
