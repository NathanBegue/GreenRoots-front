import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../Auth/authStore";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

export default function Connexion({ isDarkMode }: { isDarkMode: boolean }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

      // Décoder le token pour vérification (facultatif, car le store le décode déjà)
      const decodedToken = jwtDecode(data.token);
      console.log("Token décodé :", decodedToken);

      // Mise à jour du store avec le token (le store se charge de décoder et de définir les rôles)
      login(data.token);

      console.log("Connexion réussie :", data);
      showSuccessToast("Connexion réussie !");
      navigate("/");
    } catch (error) {
      console.error(error);
      showErrorToast(error.message);
    }
  };

  return (
    <div className={`w-full h-screen px-6 py-10 shadow-lg pt-24 ${isDarkMode ? "bg-dark-primary text-white " : "bg-light-primary text-black"}  min-lg:pt-48 min-lg:px-125`}>

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
            className={`border p-3 rounded-lg w-full ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} focus:outline-none focus:ring-2 focus:ring-cta`}
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
            className={`border p-3 rounded-lg w-full ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} focus:outline-none focus:ring-2 focus:ring-cta`}
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
          className={`flex justify-center items-center px-10  ${isDarkMode ? "bg-dark-secondary" : "bg-light-secondary"} mx-10  p-2  rounded-sm md:rounded-md lg:rounded-lg cursor-pointer hover:scale-110`}
        >
          Connexion
        </button>
      </form>
    </div>
  );
}
