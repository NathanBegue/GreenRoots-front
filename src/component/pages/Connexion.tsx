import { Link } from "react-router";
import { useAuthStore } from "../../Auth/authStore";
import { useState } from "react";

export default function Connexion() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/connexion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Erreur lors de la connexion");

            login(data.token, data.isAdmin);
            console.log("Connexion réussie :", data);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full min-h-[calc(100vh-37px)] px-6 py-10 shadow-lg pt-24 bg-dark-primary text-white lg:pt-32">

            <h1 className="text-2xl font-bold text-center mb-20">Rebonjour</h1>

            <form onSubmit={handleLogin} className="flex flex-col gap-6 mt-20">
                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-semibold mb-1">Adresse e-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Entrez votre adresse e-mail"
                        className="border p-3 rounded-lg w-full bg-dark-secondary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Mot de passe */}
                <div className="flex flex-col">
                    <label htmlFor="password" className="font-semibold mb-1">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Choisissez un mot de passe"
                        className="border p-3 rounded-lg w-full bg-dark-secondary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* Lien Mot de passe oublié */}
                    <Link to="/mot-de-passe-oublie" className="text-sm text-cta hover:underline pt-2 self-end">
                        Mot de passe oublié ?
                    </Link>
                </div>

                {/* Bouton de connexion */}
                <button
                    type="submit"
                    className="bg-cta text-white py-3 px-6 rounded-lg w-full font-bold hover:bg-cta-dark transition"
                >
                    Connexion
                </button>
            </form>
        </div>
    );
}
