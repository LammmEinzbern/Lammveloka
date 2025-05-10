import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../utils/SupaWorld";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Destinations from Supabase
  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("negara_asia").select("*");
      if (error) throw error;

      const mappedData = data.map((item) => ({
        id: item.id,
        name: item.nama_tempat,
        description: item.deskripsi_tempat,
        imageUrl: item.foto_wisata,
      }));

      setDestinations(mappedData);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section (Carousel) */}
      <section className="relative w-full h-[500px] bg-gray-100">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          effect="fade"
          loop={true}
          pagination={{ clickable: true }}
          className="h-full"
        >
          {destinations.slice(0, 5).map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative w-full h-[500px]">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
                  <h1 className="text-4xl lg:text-6xl font-bold text-white">
                    {item.name}
                  </h1>
                  <p className="text-lg text-gray-200 mt-4 max-w-xl">
                    {item.description.length > 120
                      ? item.description.substring(0, 120) + "..."
                      : item.description}
                  </p>
                  <Link
                    to={`/destinations/${item.id}`}
                    className="mt-6 inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Lihat Destinasi
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Video Section */}
      <section className="relative bg-gray-900">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 max-w-7xl mx-auto py-16 px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Perjalanan Asia
          </h2>
          <p className="max-w-xl text-lg text-gray-300 mx-auto mb-6">
            Rasakan petualangan dan keindahan Asia melalui pengalaman video ini.
          </p>
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[400px] rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/wEHQlI2BYRU?autoplay=1&mute=1&loop=1&playlist=wEHQlI2BYRU"
                title="Experience Indonesia"
                frameBorder="0"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Destinasi Populer
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 animate-pulse rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.slice(0, 6).map((destination) => (
                <div
                  key={destination.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={destination.imageUrl}
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {destination.name}
                    </h3>
                    <p className="text-gray-600 mt-2 line-clamp-2">
                      {destination.description}
                    </p>
                    <Link
                      to={`/destinations/${destination.id}`}
                      className="text-blue-600 font-semibold mt-4 inline-block hover:underline"
                    >
                      Selengkapnya
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Jangan Lewatkan Kesempatan!</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Bergabunglah bersama jutaan wisatawan untuk menjelajahi Indonesia dan
          membuat momen tak terlupakan.
        </p>
        <Link
          to="/register"
          className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100"
        >
          Daftar Sekarang
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default Home;
