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
    number_telephone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        navigate("/login");
        return;
      }

      const { data, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profileError) {
        setProfile(data);
        setFormData({
          full_name: data.full_name || "",
          email: data.email || "",
          number_telephone: data.number_telephone || "",
        });
      }

      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !profile) return;

    const ext = file.name.split(".").pop();
    const fileName = `${profile.id}-${Date.now()}.${ext}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) {
      Swal.fire("Upload Gagal", uploadError.message, "error");
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", profile.id);

    if (updateError) {
      Swal.fire("Update Gagal", updateError.message, "error");
    } else {
      setProfile((prev) => ({ ...prev, avatar_url: publicUrl }));
      Swal.fire("Berhasil!", "Foto profil diperbarui", "success");
    }
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("id", profile.id);

    if (error) {
      Swal.fire("Gagal Update", error.message, "error");
    } else {
      setProfile({ ...profile, ...formData });
      setIsEditing(false);
      Swal.fire("Berhasil", "Profil diperbarui", "success");
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Swal.fire("Gagal Logout", error.message, "error");
    } else {
      navigate("/login");
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Memuat...</p>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <Header />
      <main className="py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-16 mt-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative text-center">
              <img
                src={profile.avatar_url || "https://i.pravatar.cc/300"}
                alt="Avatar"
                className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md mx-auto"
              />
              <label className="block mt-3 text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                Ganti Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex-1">
              <div className="mb-4">
                {isEditing ? (
                  <input
                    className="text-3xl font-bold bg-transparent border-b w-full mb-2 dark:border-gray-600 focus:outline-none"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                  />
                ) : (
                  <h1 className="text-3xl font-bold">
                    {profile.full_name || "Tanpa Nama"}
                  </h1>
                )}
                <p className="text-blue-500">
                  @
                  {(profile.full_name || "username")
                    .replace(/\s+/g, "")
                    .toLowerCase()}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300 disabled">
                    Email
                  </label>

                  <p className="font-medium">{profile.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300">
                    No Telepon
                  </label>
                  {isEditing ? (
                    <input
                      className="w-full bg-transparent border-b dark:border-gray-600 focus:outline-none"
                      type="text"
                      value={formData.number_telephone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          number_telephone: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="font-medium">
                      {profile.number_telephone || "-"}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
                    >
                      Simpan
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
                    >
                      Batal
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                  >
                    Edit Profil
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
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
