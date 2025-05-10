import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../Auth/AuthStore";
import { supabase } from "../utils/SupaWorld";

const Profile = () => {
  const { user, profile, fetchUserProfile, logout } = useAuthStore();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({
    full_name: "",
    email: "",
    no_telp: "",
    alamat: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (user) {
      fetchUserProfile(user.id);
    } else {
      navigate("/login");
    }
  }, [user, fetchUserProfile, navigate]);

  useEffect(() => {
    if (profile) {
      setUpdatedProfile({
        full_name: profile.full_name || "",
        email: profile.email || "",
        no_telp: profile.no_telp || "",
        alamat: profile.alamat || "",
        avatar_url: profile.avatar_url || "",
      });
    }
  }, [profile]);

  // 🔹 Handle Update Profile
  const handleUpdateProfile = async () => {
    const { error } = await supabase
      .from("profiles")
      .update(updatedProfile)
      .eq("id", user.id);

    if (error) {
      console.error("❌ Error updating profile:", error.message);
    } else {
      alert("✅ Profil berhasil diperbarui!");
      fetchUserProfile(user.id);
      setEditing(false);
    }
  };

  // 🔹 Handle Upload Foto Profil
  const handleUploadAvatar = async (event) => {
    setUploading(true);
    const file = event.target.files[0];

    if (!file) {
      setUploading(false);
      return;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("❌ Error uploading avatar:", uploadError.message);
      alert("Gagal mengunggah gambar");
      setUploading(false);
      return;
    }

    // 🔹 Ambil URL gambar dari Supabase
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    if (data.publicUrl) {
      setUpdatedProfile({ ...updatedProfile, avatar_url: data.publicUrl });
      await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl })
        .eq("id", user.id);
      fetchUserProfile(user.id);
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0f1e] to-[#16222A]">
      <div className="relative w-full max-w-4xl bg-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-700 flex flex-col md:flex-row items-center gap-6 md:gap-12">
        {/* Tombol Back */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white text-2xl hover:text-gray-300 transition"
        >
          <IoArrowBack />
        </button>

        {/* Kolom Kiri: Foto Profil */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={updatedProfile.avatar_url || "https://via.placeholder.com/150"}
            alt="Foto Profil"
            className="w-40 h-40 rounded-full border-4 border-blue-500 shadow-lg object-cover"
          />
          <label className="cursor-pointer text-blue-400 hover:text-blue-300 text-sm">
            {uploading ? "Mengunggah..." : "Ubah Foto"}
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadAvatar}
              className="hidden"
            />
          </label>
        </div>

        {/* Kolom Kanan: Informasi & Edit Profile */}
        <div className="flex-1 space-y-5">
          {/* Nama */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={updatedProfile.full_name}
              onChange={(e) =>
                setUpdatedProfile({
                  ...updatedProfile,
                  full_name: e.target.value,
                })
              }
              className="w-full p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
              disabled={!editing}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
              type="email"
              value={updatedProfile.email}
              onChange={(e) =>
                setUpdatedProfile({ ...updatedProfile, email: e.target.value })
              }
              className="w-full p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
              disabled={!editing}
            />
          </div>

          {/* Nomor Telepon */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Nomor Telepon
            </label>
            <input
              type="text"
              value={updatedProfile.no_telp}
              onChange={(e) =>
                setUpdatedProfile({
                  ...updatedProfile,
                  no_telp: e.target.value,
                })
              }
              className="w-full p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
              disabled={!editing}
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-gray-300 text-sm mb-1">Alamat</label>
            <textarea
              value={updatedProfile.alamat}
              onChange={(e) =>
                setUpdatedProfile({ ...updatedProfile, alamat: e.target.value })
              }
              className="w-full p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
              disabled={!editing}
            />
          </div>

          {/* Tombol Edit & Simpan */}
          {editing ? (
            <button
              onClick={handleUpdateProfile}
              className="w-full bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            >
              Simpan Perubahan
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
            >
              Edit Profil
            </button>
          )}

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
