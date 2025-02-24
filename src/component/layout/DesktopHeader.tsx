import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../Auth/authStore";
import useCartStore from "../../Auth/cartStore"; // Import du store du panier
import DarkModeToggle from "../ui/DarkModeToggle";

interface DesktopHeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DesktopHeader({ isDarkMode, setIsDarkMode }: DesktopHeaderProps) {
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();
  const { cart } = useCartStore(); // Récupération du panier

  // Calcul du nombre total d'articles dans le panier
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className={`fixed z-30 ${isDarkMode ? "bg-dark-secondary" : "bg-light-secondary"} mx-auto  w-full h-24 px-2 lg:h-lg 2xl:h-30  flex items-center justify-between shadow-lg z-10000  `}>
      <div className="pl-4">
        {/* Logo */}
        <Link to="/">
          <img className="h-16 rounded-lg 2xl:w-25 2xl:h-25" src="src/assets/images/logo.webp" alt="Logo" />
        </Link >
      </div>
      {/* Navigation */}
      <nav>
        <ul className={`flex gap-10 text-white font-title text-xl 2xl:text-3xl `}>
          <li>
            <Link to="/" className={`group relative px-4 py-2  transition ${isDarkMode ? "text-white" : "text-black"}`}>
              Accueil
              <span className={`absolute left-0 bottom-0 w-full h-1  ${isDarkMode ? "bg-white" : "bg-black"} scale-x-0 group-hover:scale-x-100 transition-transform`}></span>
            </Link>
          </li>
          <li>
            <Link to="/boutique" className={`group relative px-4 py-2  transition ${isDarkMode ? "text-white" : "text-black"}`}>
              Boutique
              <span className={`absolute left-0 bottom-0 w-full h-1  ${isDarkMode ? "bg-white" : "bg-black"} scale-x-0 group-hover:scale-x-100 transition-transform`}></span>
            </Link>
          </li>
          <li>
            <Link to="/historique" className={`group relative px-4 py-2  transition ${isDarkMode ? "text-white" : "text-black"}`}>
              Historique
              <span className={`absolute left-0 bottom-0 w-full h-1  ${isDarkMode ? "bg-white" : "bg-black"} scale-x-0 group-hover:scale-x-100 transition-transform`}></span>
            </Link>
          </li>
          <li>
            <Link to="/suivis" className={`group relative px-4 py-2  transition ${isDarkMode ? "text-white" : "text-black"}`}>
              Suivis
              <span className={`absolute left-0 bottom-0 w-full h-1  ${isDarkMode ? "bg-white" : "bg-black"} scale-x-0 group-hover:scale-x-100 transition-transform`}></span>
            </Link>
          </li>
        </ul>
      </nav>
      {/* Icônes et Actions */}
      <div className={`flex items-center gap-4`}>
        {/* Lien vers le panier avec compteur */}
        <Link to="/panier" className="relative">
          <img className={`h-8 ${isDarkMode && "invert"} cursor-pointer hover:scale-110 transition`} src="/images/icons/shop-card.svg" alt="Panier" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>


        <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />


        {/* 🔥 Condition : Si l'utilisateur est connecté, afficher "Mon Compte" et "Déconnexion" */}
        {token ? (
          <div className="flex gap-4">
            <Link to="/compte">
              <button className={`px-4 py-1 rounded-lg bg-dark-primary  cursor-pointer hover:scale-110 text-lg ${!isDarkMode && "bg-light-primary text-black"} `}>
                Mon Compte
              </button>
            </Link>
            <button
              className={`px-4 py-1 rounded-lg bg-red-600 cursor-pointer hover:scale-110 text-lg ${!isDarkMode && "bg-light-primary text-black"}`}
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="flex gap-4 pr-4">
            <Link to="/inscription">
              <button className={`px-4 py-1 rounded-lg bg-dark-primary cursor-pointer hover:scale-110 text-lg ${!isDarkMode ? "bg-light-primary text-black" : "text-white"}  2xl:text-2xl`}>
                Inscription
              </button>
            </Link>
            <Link to="/connexion">
              <button className={`px-4 py-1 rounded-lg bg-dark-primary cursor-pointer hover:scale-110 text-lg ${!isDarkMode ? "bg-light-primary text-black" : "text-white"}   2xl:text-2xl`}>
                Connexion
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
