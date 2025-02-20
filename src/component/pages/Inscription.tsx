import { useState } from "react";
import { useNavigate } from "react-router";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

export default function Inscription({ isDarkMode }: { isDarkMode: boolean }) {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeat_password, setrepeat_password] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Inscription en cours...");

        if (password !== repeat_password) {
            showErrorToast("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/inscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstname, lastname, email, password, repeat_password }),
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                // Si le serveur renvoie une erreur (ex: 400 Bad Request)
                showErrorToast(data.error || "Une erreur est survenue.");
                return;
            }

            showSuccessToast("Inscription réussie !");
            navigate("/connexion");

        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
        }
    }

    return (
        <div className={`w-full min-md:h-250 px-6 py-10 shadow-lg pt-24 ${isDarkMode ? "bg-dark-primary text-white" : "bg-light-primary text-black"} lg:pt-32`}>
            <h1 className="text-2xl font-bold text-center mb-6 md:text-3xl">Bienvenue</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Prénom */}
                <div className="flex flex-col">
                    <label htmlFor="firstname" className="font-semibold mb-1 md:text-xl">Prénom</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        placeholder="Entrez votre prénom"
                        className={`border p-3 rounded-lg w-full ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} focus:outline-none focus:ring-2 focus:ring-cta`}
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                        required
                    />
                </div>

                {/* Nom */}
                <div className="flex flex-col">
                    <label htmlFor="lastname" className="font-semibold mb-1 md:text-xl">Nom</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Entrez votre nom"
                        className={`border p-3 rounded-lg w-full ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} focus:outline-none focus:ring-2 focus:ring-cta`}
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                        required
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="font-semibold mb-1 md:text-xl">Adresse e-mail</label>
                    <input
                        type="email"
                        id="mail"
                        name="email"
                        placeholder="Entrez votre adresse e-mail"
                        className={`border p-3 rounded-lg w-full ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} focus:outline-none focus:ring-2 focus:ring-cta`}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>

                {/* Mot de passe */}
                <div className="flex flex-col">
                    <label htmlFor="password" className="font-semibold mb-1 md:text-xl">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Choisissez un mot de passe"
                        className={`border p-3 rounded-lg w-full ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} focus:outline-none focus:ring-2 focus:ring-cta`}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>

                {/* Confirmation du mot de passe */}
                <div className="flex flex-col">
                    <label htmlFor="confirmation" className="font-semibold mb-1 md:text-xl">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        id="confirmation"
                        name="confirmation"
                        placeholder="Confirmez votre mot de passe"
                        className={`border p-3 rounded-lg w-full ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} focus:outline-none focus:ring-2 focus:ring-cta`}
                        onChange={(e) => setrepeat_password(e.target.value)}
                        value={repeat_password}
                        required
                    />
                </div>

                {/* Bouton d'inscription */}
                <button
                    type="submit"
                    className="bg-cta text-white py-3 px-6 rounded-lg w-full font-bold hover:bg-cta-dark transition"
                >
                    Inscription
                </button>
            </form>
        </div>
    );
}
