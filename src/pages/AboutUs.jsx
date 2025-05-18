import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaWorld";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  const [heroImage, setHeroImage] = useState("");

  useEffect(() => {
    const fetchHeroImage = async () => {
      const { data } = await supabase
        .from("negara_asia")
        .select("foto_wisata")
        .limit(1)
        .single();
      if (data) setHeroImage(data.foto_wisata);
    };
    fetchHeroImage();
  }, []);

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[450px]">
        {heroImage ? (
          <img
            src={heroImage}
            alt="Tentang Kami"
            className="absolute inset-0 w-full h-full object-cover brightness-50 dark:brightness-75 transition-opacity duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center text-center text-white">
          <div className="px-6 animate-fade-in">
            <h1 className="text-4xl font-bold mb-3">Tentang Kami</h1>
            <p className="text-lg max-w-xl mx-auto">
              Lammveloka menyajikan informasi wisata terbaik dari berbagai
              penjuru Asia.
            </p>
          </div>
        </div>
      </section>

      {/* Siapa Kami */}
      <section className="py-14 bg-white dark:bg-gray-900 px-6 text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Siapa Kami?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Kami adalah platform yang membantu Anda menjelajahi tempat wisata,
          budaya, dan kuliner khas Asia dengan informasi terpercaya dan
          inspiratif.
        </p>
      </section>

      {/* Layanan Kami */}
      <section className="py-14 bg-gray-50 dark:bg-gray-800 animate-fade-in">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-10">
            Layanan Kami
          </h2>
          <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
            {[
              ["🌍 Destinasi", "Tempat wisata terbaik dari seluruh Asia."],
              ["🍜 Kuliner", "Rekomendasi makanan khas tiap negara."],
              ["🎭 Festival", "Event dan perayaan budaya menarik."],
            ].map(([title, desc], i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misi Kami */}
      <section className="py-14 bg-blue-600 dark:bg-blue-800 text-white text-center px-6 animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">Misi Kami</h2>
        <p className="max-w-3xl mx-auto leading-relaxed">
          Menjadi panduan digital terbaik bagi siapa pun yang ingin menjelajah
          Asia secara mudah, aman, dan menyenangkan.
        </p>
      </section>

      {/* Gabung Section */}
      <section className="py-14 bg-white dark:bg-gray-900 text-center px-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Gabung Bersama Kami
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
          Temukan inspirasi dan rencanakan petualangan impianmu bersama
          Lammveloka!
        </p>
        <a
          href="/register"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow transition duration-300"
        >
          Daftar Sekarang
        </a>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
