import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../Auth/authStore";

const login = useAuthStore((state) => state.login);

const authFetch = {
    // ???
    getRegister: async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/inscription`
            );
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            throw error;
        }
    },

    // creation de compte
    createAccount: async (
        firstname: string,
        lastname: string,
        email: string,
        password: string,
        repeat_password: string
    ) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/inscription`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ firstname, lastname, email, password, repeat_password }),
                }
            );
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            throw error;
        }
    },

    // connexion
    getLogin: async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/connexion`
            );
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            throw error;
        }
    },

    // Se connecter
    login: async (email: string, password: string) => {
        try {
            const response = await fetch("http://localhost:3000/connexion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de la connexion");
            }

            // 🔥 Décoder le token pour vérification (facultatif, car le store le décode déjà)
            const decodedToken = jwtDecode(data.token);
            console.log("Token décodé :", decodedToken);

            // Mise à jour du store avec le token (le store se charge de décoder et de définir les rôles)
            login(data.token);

            console.log("Connexion réussie :", data);

        } catch (error) {
            console.error(error);
        }
    },

    // mot de passe oublié
    getForgotPassword: async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/mot-de-passe-oublie`
            );
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Erreur lors de la récupération du mot de passe :", error);
            throw error;
        }
    },

    // changement de mot de passe
    changePassword: async (
        email: string,
        password: string,
        repeat_password: string
    ) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/mot-de-passe-oublie`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password, repeat_password }),
                }
            );
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("Erreur lors du changement de mot de passe :", error);
            throw error;
        }
    },


};

export default authFetch;
