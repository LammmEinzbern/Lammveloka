import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../utils/SupaWorld";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    no_telepon: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("Gagal ambil user:", error?.message || "User null");
        navigate("/login");
        return;
      }

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error("Gagal ambil data profil:", profileError.message);
      } else {
        setProfile(data);
        setFormData({
          full_name: data.full_name || "",
          email: data.email || "",
          no_telepon: data.no_telepon || "",
        });
      }

      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Swal.fire("Gagal Logout", error.message, "error");
    } else {
      Swal.fire({
        icon: "success",
        title: "Logout berhasil",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => navigate("/login"));
    }
  };

  const handleUpdate = async () => {
    if (!profile) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        email: formData.email,
        no_telepon: formData.no_telepon,
      })
      .eq("id", profile.id);

    if (error) {
      Swal.fire("Gagal update", error.message, "error");
    } else {
      setProfile((prev) => ({
        ...prev,
        ...formData,
      }));
      setIsEditing(false);
      Swal.fire("Berhasil!", "Profil berhasil diperbarui", "success");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-600 dark:text-gray-300">
        Memuat data profil...
      </p>
    );
  }

  if (!profile) {
    return (
      <p className="text-center mt-20 text-red-500 dark:text-red-400">
        Data profil tidak ditemukan.
      </p>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      <main className="flex-grow bg-gradient-to-b from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900 py-12 px-4">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mt-20 transition">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8">
            <div className="flex-shrink-0">
              <img
                src={profile.avatar_url || "https://i.pravatar.cc/300"}
                alt="Foto Profil"
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-600 shadow-md"
              />
            </div>

            <div className="flex-1">
              <div className="mb-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    className="text-3xl font-extrabold bg-transparent border-b border-gray-400 dark:border-gray-600 focus:outline-none text-gray-800 dark:text-gray-100"
                  />
                ) : (
                  <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
                    {profile.full_name || "Tanpa Nama"}
                  </h2>
                )}
                <p className="text-blue-500 dark:text-blue-300 text-lg font-medium">
                  @
                  {profile.full_name?.replace(/\s+/g, "").toLowerCase() ||
                    "username"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-gray-400 dark:border-gray-600 focus:outline-none text-gray-800 dark:text-gray-100"
                    />
                  ) : (
                    <p className="font-semibold">{profile.email || "-"}</p>
                  )}
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Telepon
                  </p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.no_telepon}
                      onChange={(e) =>
                        setFormData({ ...formData, no_telepon: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-gray-400 dark:border-gray-600 focus:outline-none text-gray-800 dark:text-gray-100"
                    />
                  ) : (
                    <p className="font-semibold">{profile.no_telepon || "-"}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-4 flex-wrap">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium shadow"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium shadow"
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow"
                  >
                    Edit Profil
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium shadow"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
