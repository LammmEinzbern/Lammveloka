import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaWorld";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [destinasi, setDestinasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nama_tempat: "",
    nama_negara: "",
    deskripsi_tempat: "",
    kategori_tempat: "",
    foto_wisata: "",
    tempat_alam: "",
    foto_alam: "",
    deskripsi_alam: "",
    tempat_alam2: "",
    foto_alam2: "",
    deskripsi_alam2: "",
    link: "",
  });

  const navigate = useNavigate();

  const fieldLabels = {
    nama_tempat: "Nama Tempat Wisata",
    nama_negara: "Nama Negara",
    deskripsi_tempat: "Deskripsi Tempat Wisata",
    kategori_tempat: "Kategori Tempat",
    foto_wisata: "Link Foto Wisata",
    tempat_alam: "Nama Tempat Alam 1",
    foto_alam: "Link Foto Alam 1",
    deskripsi_alam: "Deskripsi Tempat Alam 1",
    tempat_alam2: "Nama Tempat Alam 2",
    foto_alam2: "Link Foto Alam 2",
    deskripsi_alam2: "Deskripsi Tempat Alam 2",
    link: "Link Maps atau Website",
  };

  const fetchData = async () => {
    const { data, error } = await supabase.from("negara_asia").select("*");
    if (!error) setDestinasi(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from("negara_asia")
        .update(formData)
        .eq("id", editingId);
      if (!error) {
        Swal.fire("Berhasil", "Data diperbarui!", "success");
        setEditingId(null);
      }
    } else {
      const { error } = await supabase.from("negara_asia").insert([formData]);
      if (!error) {
        Swal.fire("Berhasil", "Data ditambahkan!", "success");
      }
    }

    resetForm();
    fetchData();
  };

  const resetForm = () => {
    setFormData({
      nama_tempat: "",
      nama_negara: "",
      deskripsi_tempat: "",
      kategori_tempat: "",
      foto_wisata: "",
      tempat_alam: "",
      foto_alam: "",
      deskripsi_alam: "",
      tempat_alam2: "",
      foto_alam2: "",
      deskripsi_alam2: "",
      link: "",
    });
    setEditingId(null);
  };

  const handleEdit = (item) => {
    const { id, ...dataWithoutId } = item;
    setFormData(dataWithoutId);
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    });

    if (confirm.isConfirmed) {
      const { error } = await supabase
        .from("negara_asia")
        .delete()
        .eq("id", id);
      if (!error) {
        Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
        fetchData();
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <NavLink
          to={"/"}
          className="bg-white h-10 w-16 text-center rounded-lg text-black font-bold "
        >
          kembali
        </NavLink>
        <h1 className="text-3xl font-bold">Dashboard Admin 👑</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Destinasi" : "Tambah Destinasi"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="mb-1 text-sm text-gray-300">
                {fieldLabels[key] || key}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={fieldLabels[key] || key}
                className="p-2 rounded bg-gray-700 placeholder-gray-400"
              />
            </div>
          ))}
          <div className="col-span-full flex gap-2">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            >
              {editingId ? "Update" : "Tambah"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center">Memuat data...</p>
        ) : (
          <table className="w-full text-sm bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="p-3 text-left">Tempat</th>
                <th className="p-3 text-left">Negara</th>
                <th className="p-3 text-left">Kategori</th>
                <th className="p-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {destinasi.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-700 hover:bg-gray-700/50"
                >
                  <td className="p-3">{item.nama_tempat}</td>
                  <td className="p-3">{item.nama_negara}</td>
                  <td className="p-3">{item.kategori_tempat}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
