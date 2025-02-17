import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../Auth/authStore";
import useCartStore from "../../Auth/cartStore"; // Import du store du panier

export default function DesktopHeader() {
    const { token, logout } = useAuthStore();
    const navigate = useNavigate();
    const { cart } = useCartStore(); // Récupération du panier

    // Calcul du nombre total d'articles dans le panier
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <header className="fixed z-30 bg-dark-secondary w-full h-24 px-12 flex items-center justify-between shadow-lg">
            {/* Logo */}
            <img className="h-16" src="/images/icons/logo-.svg" alt="Logo" />

            {/* Navigation */}
            <nav>
                <ul className="flex gap-10 text-white font-title text-xl">
                    <li>
                        <Link
                            to="/"
                            className="group relative px-4 py-2 hover:text-cta transition"
                        >
                            Accueil
                            <span className="absolute left-0 bottom-0 w-full h-1 bg-cta scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/boutique"
                            className="group relative px-4 py-2 hover:text-cta transition"
                        >
                            Boutique
                            <span className="absolute left-0 bottom-0 w-full h-1 bg-cta scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/historique"
                            className="group relative px-4 py-2 hover:text-cta transition"
                        >
                            Historique
                            <span className="absolute left-0 bottom-0 w-full h-1 bg-cta scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Icônes et Actions */}
            <div className="flex items-center gap-8">
                <img className="h-10 invert cursor-pointer hover:scale-110 transition" src="/images/icons/moon.svg" alt="Mode sombre" />

                {/* Lien vers le panier avec compteur */}
                <Link to="/panier" className="relative">
                    <img className="h-10 invert cursor-pointer hover:scale-110 transition" src="/images/icons/shop-card.svg" alt="Panier" />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                            {totalItems}
                        </span>
                    )}
                </Link>

                {/* 🔥 Condition : Si l'utilisateur est connecté, afficher "Mon Compte" et "Déconnexion" */}
                {token ? (
                    <div className="flex gap-6">
                        <Link to="/compte">
                            <button className="px-6 py-3 bg-cta text-white rounded-lg hover:bg-cta-dark transition text-lg">
                                Mon Compte
                            </button>
                        </Link>
                        <button
                            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-lg"
                            onClick={() => {
                                logout()
                                navigate("/")
                            }}
                        >
                            Déconnexion
                        </button>
                    </div>
                ) : (
                    <div className="flex gap-6">
                        <Link to="/inscription"><button className="px-6 py-3 bg-dark-primary text-white rounded-lg border border-cta hover:bg-cta hover:text-dark-secondary transition text-lg">
                            Inscription
                        </button>
                        </Link>
                        <Link to="/connexion"> <button className="px-6 py-3 bg-cta text-white rounded-lg hover:bg-cta-dark transition text-lg">
                            Connexion
                        </button>
                        </Link>
                    </div>
                )}
                {/* Boutons Auth */}

            </div>
        </header>
    );
}