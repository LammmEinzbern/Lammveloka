import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaWorld";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  const [heroImage, setHeroImage] = useState("");

  useEffect(() => {
    const fetchHeroImage = async () => {
      const { data, error } = await supabase
        .from("negara_asia")
        .select("foto_wisata")
        .limit(1)
        .single();

      if (!error && data) {
        setHeroImage(data.foto_wisata);
      }
    };

    fetchHeroImage();
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          {heroImage ? (
            <img
              src={heroImage}
              alt="Tentang Kami - Lammveloka"
              className="w-full h-full object-cover brightness-[0.6] transition-all duration-1000 ease-in-out"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
          )}
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg animate-fade-in">
            Tentang Kami
          </h1>
          <p className="mt-4 text-lg max-w-2xl animate-fade-in text-gray-200">
            Selamat datang di{" "}
            <span className="font-semibold text-white">Lammveloka</span>,
            website informasi wisata terbaik yang akan membawa Anda menjelajahi
            keindahan negara-negara di Asia!
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Siapa Kami?</h2>
          <p className="text-lg text-gray-600">
            Lammveloka adalah platform yang didedikasikan untuk memberikan
            informasi akurat, inspiratif, dan terkini tentang berbagai tempat
            wisata di Asia. Kami percaya bahwa setiap perjalanan adalah sebuah
            pengalaman berharga, dan kami ingin membantu Anda merencanakan
            petualangan terbaik!
          </p>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
            Apa yang Kami Tawarkan?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "🌍 Destinasi Wisata",
                description:
                  "Jelajahi pantai, gunung, kota, dan situs bersejarah terbaik di Asia.",
              },
              {
                title: "🍜 Rekomendasi Kuliner",
                description:
                  "Cicipi makanan autentik dari berbagai negara di Asia.",
              },
              {
                title: "🎭 Event & Festival",
                description:
                  "Ikuti perayaan budaya dan acara menarik yang hanya ada di Asia.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {service.title}
                </h3>
                <p className="text-gray-600 mt-2">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Misi Kami</h2>
        <p className="max-w-3xl mx-auto text-lg">
          Kami ingin menjadi panduan perjalanan digital terbaik bagi siapa saja
          yang ingin menjelajahi Asia. Dengan informasi yang lengkap dan akurat,
          kami berharap bisa membuat perjalanan Anda lebih mudah, aman, dan tak
          terlupakan.
        </p>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Bergabunglah dengan Kami!
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Mari jelajahi keajaiban Asia bersama Lammveloka! Jangan ragu untuk
          berbagi pengalaman, mencari inspirasi, dan merencanakan petualangan
          impian Anda bersama kami.
        </p>
        <div className="mt-8">
          <a
            href="/register"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:opacity-90 transition duration-300"
          >
            Bergabung Sekarang
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
