import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../utils/SupaWorld";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      profile: null,
      loading: false,
      error: null,

      // 🔹 Mengecek sesi user setelah refresh
      checkSession: async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error);
          set({ user: null, profile: null });
        } else if (data?.session?.user) {
          set({ user: data.session.user });
          await useAuthStore.getState().fetchUserProfile(data.session.user.id);
        }
      },

      // 🔹 Ambil data profil user dari Supabase
      fetchUserProfile: async (userId) => {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();
        if (error) {
          console.error("Error fetching profile:", error);
          set({ profile: null });
        } else {
          set({ profile: data });
        }
      },

      // 🔹 Register User
      register: async (email, password, fullName) => {
        set({ loading: true, error: null });

        try {
          const { error: signUpError } = await supabase.auth.signUp({
            email,
            password,
          });
          if (signUpError) throw signUpError;

          const { data, error: userError } = await supabase.auth.getUser();
          if (userError) throw userError;

          const user = data.user;
          if (!user)
            throw new Error("User tidak ditemukan setelah registrasi.");

          const { error: profileError } = await supabase
            .from("profiles")
            .upsert([
              {
                id: user.id,
                email,
                full_name: fullName,
                role: "user", // 🔹 Semua user baru akan jadi "user" secara default
              },
            ]);

          if (profileError) throw profileError;

          set({ user, loading: false });
          await useAuthStore.getState().fetchUserProfile(user.id);
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      // 🔹 Login User
      login: async (email, password) => {
        set({ loading: true, error: null });

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error) throw error;

          set({ user: data.user, loading: false });

          // 🔹 Ambil data user dari Supabase
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();

          set({ profile });

          return profile?.role; // 🔹 Kembalikan role user untuk menentukan redirect
        } catch (error) {
          set({ error: error.message, loading: false });
          return null;
        }
      },

      // 🔹 Logout User
      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, profile: null });
      },
    }),
    {
      name: "auth-storage", // Simpan di localStorage agar tidak logout setelah refresh
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
