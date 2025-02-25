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
        <div className={`w-screeen min-h-screen m-auto shadow-lg ${isDarkMode ? "bg-dark-primary text-white" : "bg-light-primary text-black"} lg:pt-40 pt-40 `}>
            <h1 className="text-2xl font-bold text-center mb-6 md:text-3xl">Bienvenue</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full 2xl:w-auto mx-auto">
                {/* Prénom */}
                <div className="flex flex-col mx-auto 2xl:w-2xl 2xl:text-2xl sm:w-sm lg:w-lg md:w-md ">
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
                <div className="flex flex-col mx-auto 2xl:w-2xl 2xl:text-2xl sm:w-sm lg:w-lg md:w-md ">
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
                <div className="flex flex-col mx-auto 2xl:w-2xl 2xl:text-2xl sm:w-sm lg:w-lg md:w-md ">
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
                <div className="flex flex-col mx-auto 2xl:w-2xl 2xl:text-2xl sm:w-sm lg:w-lg md:w-md ">
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
                <div className="flex flex-col mx-auto 2xl:w-2xl 2xl:text-2xl sm:w-sm lg:w-lg md:w-md  ">
                    <label htmlFor="confirmation" className="font-semibold mb-1 md:text-xl ">Confirmer le mot de passe</label>
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
                    className={`sm:w-sm lg:w-lg md:w-md 2xl:w-2xl mx-auto flex justify-center items-center 2xl:text-2xl ${isDarkMode ? "bg-dark-secondary" : "bg-light-secondary"} mx-10  p-2  rounded-sm md:rounded-md lg:rounded-lg cursor-pointer hover:scale-110 mb-20`}
                >
                    Inscription
                </button>
            </form>
        </div>
    );
}
