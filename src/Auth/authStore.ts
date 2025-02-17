import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    role_id: number;
    id: number;
}

interface IAuthState {
    token: string | null;
    isAdmin: boolean;
    isMember: boolean;
    userId: number | null;
    login: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
    token: localStorage.getItem("token"),
    isAdmin: localStorage.getItem("isAdmin") === "true",
    isMember: localStorage.getItem("isMember") === "true",
    userId: localStorage.getItem("userId") ? Number(localStorage.getItem("userId")) : null,

    login: (token: string) => {
        localStorage.setItem("token", token);

        const decodedToken: DecodedToken = jwtDecode(token);
        const isAdmin = decodedToken.role_id === 1;
        const isMember = decodedToken.role_id === 2;
        const userId = decodedToken.id;

        localStorage.setItem("isAdmin", String(isAdmin));
        localStorage.setItem("isMember", String(isMember));
        localStorage.setItem("userId", String(userId));

        set({ token, isAdmin, isMember, userId });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("isMember");
        localStorage.removeItem("userId");
        set({ token: null, isAdmin: false, isMember: false, userId: null });
    },
}));
