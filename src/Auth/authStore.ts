import { create } from "zustand";
import { IAuthState } from "../../type/type";

export const useAuthStore = create<IAuthState>((set) => ({
    token: localStorage.getItem("token") || null,
    role_id: localStorage.getItem("role_id") ? Number(localStorage.getItem("role_id")) : null,

    login: (token: string, role_id: number) => {
        console.log("Stockage du token et du rôle :", token, role_id); // ✅ Debug
        localStorage.setItem("token", token);
        localStorage.setItem("role_id", String(role_id));
        set({ token, role_id });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role_id");
        set({ token: null, role_id: null });
    },

    isAdmin: () => {
        const role_id = localStorage.getItem("role_id") ? Number(localStorage.getItem("role_id")) : null;
        console.log("isAdmin vérification :", role_id); // ✅ Debug
        return role_id === 1;
    },

    isMember: () => {
        const role_id = localStorage.getItem("role_id") ? Number(localStorage.getItem("role_id")) : null;
        console.log("isMember vérification :", role_id); // ✅ Debug
        return role_id === 2;
    }
}));
