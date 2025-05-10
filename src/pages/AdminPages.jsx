import React, { useState, useEffect } from "react";
import { supabase } from "../utils/SupaWorld";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AdminPanel = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    country: "",
    name: "",
    description: "",
    imageUrl: "",
    category: "",
    place1: "",
    image1: "",
    desc1: "",
    place2: "",
    image2: "",
    desc2: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Fetch Data Destinasi dari Supabase
  const fetchDestinations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("negara_asia").select("*");
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
  }, []);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Submit (Tambah / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.country ||
      !form.name ||
      !form.description ||
      !form.imageUrl ||
      !form.category
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      if (isEditing) {
        // 🔹 UPDATE Destinasi di Supabase
        const { error } = await supabase
          .from("negara_asia")
          .update({
            nama_negara: form.country,
            nama_tempat: form.name,
            deskripsi_tempat: form.description,
            foto_wisata: form.imageUrl,
            kategori_tempat: form.category,
            tempat_alam: form.place1,
            foto_alam: form.image1,
            deskripsi_alam: form.desc1,
            tempat_alam2: form.place2,
            foto_alam2: form.image2,
            deskripsi_alam2: form.desc2,
          })
          .eq("id", form.id);

        if (error) throw error;
        alert("✅ Destinasi berhasil diperbarui!");
      } else {
        // 🔹 TAMBAH Destinasi Baru di Supabase
        const { error } = await supabase.from("negara_asia").insert([
          {
            nama_negara: form.country,
            nama_tempat: form.name,
            deskripsi_tempat: form.description,
            foto_wisata: form.imageUrl,
            kategori_tempat: form.category,
            tempat_alam: form.place1,
            foto_alam: form.image1,
            deskripsi_alam: form.desc1,
            tempat_alam2: form.place2,
            foto_alam2: form.image2,
            deskripsi_alam2: form.desc2,
          },
        ]);

        if (error) throw error;
        alert("✅ Destinasi berhasil ditambahkan!");
      }

      // Reset Form setelah sukses
      setForm({
        id: null,
        country: "",
        name: "",
        description: "",
        imageUrl: "",
        category: "",
        place1: "",
        image1: "",
        desc1: "",
        place2: "",
        image2: "",
        desc2: "",
      });
      setIsEditing(false);
      fetchDestinations();
    } catch (error) {
      console.error("❌ Error:", error.message);
      alert("Terjadi kesalahan: " + error.message);
    }
  };

  // 🔹 Handle Edit Button
  const handleEdit = (destination) => {
    setForm({
      id: destination.id,
      country: destination.nama_negara,
      name: destination.nama_tempat,
      description: destination.deskripsi_tempat,
      imageUrl: destination.foto_wisata,
      category: destination.kategori_tempat,
      place1: destination.tempat_alam,
      image1: destination.foto_alam,
      desc1: destination.deskripsi_alam,
      place2: destination.tempat_alam2,
      image2: destination.foto_alam2,
      desc2: destination.deskripsi_alam2,
    });
    setIsEditing(true);
  };

  // 🔹 Handle Delete Button
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus destinasi ini?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase.from("negara_asia").delete().eq("id", id);

    if (error) {
      console.error("Error deleting destination:", error);
    } else {
      alert("✅ Destinasi berhasil dihapus!");
      fetchDestinations();
    }
  };

  return (
    <>
      <Header />

      <section className="max-w-7xl mx-auto py-16 px-6 mt-20">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          🛠️ Admin Panel - Kelola Destinasi
        </h1>

        {/* Form Tambah/Edit Destinasi */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {isEditing ? "✏️ Edit Destinasi" : "➕ Tambah Destinasi"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Nama Negara"
              className="p-3 border rounded-lg shadow-sm"
              required
            />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama Tempat"
              className="p-3 border rounded-lg shadow-sm"
              required
            />
            <input
              type="text"
              name="place1"
              value={form.place1}
              onChange={handleChange}
              placeholder="Nama Tempat Alam"
              className="p-3 border rounded-lg shadow-sm"
              required
            />
            <input
              type="text"
              name="place2"
              value={form.place2}
              onChange={handleChange}
              placeholder="Nama Tempat Alam 2"
              className="p-3 border rounded-lg shadow-sm"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Deskripsi Tempat"
              className="p-3 border rounded-lg shadow-sm md:col-span-2"
              required
            />
            <textarea
              name="desc1"
              value={form.desc1}
              onChange={handleChange}
              placeholder="Deskripsi Alam"
              className="p-3 border rounded-lg shadow-sm md:col-span-2"
              required
            />
            <textarea
              name="desc2"
              value={form.desc2}
              onChange={handleChange}
              placeholder="Deskripsi Alam 2"
              className="p-3 border rounded-lg shadow-sm md:col-span-2"
              required
            />
            <input
              type="text"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="Gambar Foto Wisata"
              className="p-3 border rounded-lg shadow-sm"
              required
            />
            <input
              type="text"
              name="image1"
              value={form.image1}
              onChange={handleChange}
              placeholder="Gambar Foto Alam 1"
              className="p-3 border rounded-lg shadow-sm"
              required
            />
            <input
              type="text"
              name="image2"
              value={form.image2}
              onChange={handleChange}
              placeholder="Gambar Foto Alam 2"
              className="p-3 border rounded-lg shadow-sm"
              required
            />
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Kategori"
              className="p-3 border rounded-lg shadow-sm"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
            >
              {isEditing ? "Perbarui Destinasi" : "Tambah Destinasi"}
            </button>
          </form>
        </div>

        {/* Daftar Destinasi */}
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Memuat data...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={destination.foto_wisata}
                  alt={destination.nama_tempat}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {destination.nama_tempat}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {destination.deskripsi_tempat.slice(0, 100)}...
                  </p>
                  <button
                    onClick={() => handleEdit(destination)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(destination.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 ml-5 mt-5"
                  >
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default AdminPanel;
