// authStore.ts
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    role_id: number;
}

interface IAuthState {
    token: string | null;
    isAdmin: boolean;
    isMember: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({

    token: localStorage.getItem("token"),
    isAdmin: localStorage.getItem("isAdmin") === "true",
    isMember: localStorage.getItem("isMember") === "true",

    login: (token: string) => {
        localStorage.setItem("token", token);

        // 🔥 Décodage du token pour extraire le role_id
        const decodedToken: DecodedToken = jwtDecode(token);
        const isAdmin = decodedToken.role_id === 1;  // Par exemple, role_id 1 correspond à l'admin
        const isMember = decodedToken.role_id === 2; // Par exemple, role_id 2 correspond à un membre

        localStorage.setItem("isAdmin", String(isAdmin));
        localStorage.setItem("isMember", String(isMember));

        set({ token, isAdmin, isMember });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("isMember");
        set({ token: null, isAdmin: false, isMember: false });
    },

}));
