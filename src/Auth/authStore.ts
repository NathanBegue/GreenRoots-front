import { create } from "zustand";
import { IAuthState } from "../../type/type";

export const useAuthStore = create<IAuthState>((set) => ({
    token: localStorage.getItem("token") || null,
    isAdmin: localStorage.getItem("isAdmin") ? localStorage.getItem("isAdmin") === "true" : false, // ✅ Vérification supplémentaire

    login: (token, isAdmin) => {
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", String(isAdmin)); // ✅ S'assurer que c'est une string ("true" ou "false")
        set({ token, isAdmin });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        set({ token: null, isAdmin: false });
    },
}));
