import { Link } from "react-router";

export default function DesktopHeader() {
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
                <Link to="/panier">
                    <img className="h-10 invert cursor-pointer hover:scale-110 transition" src="/images/icons/shop-card.svg" alt="Panier" />
                </Link>

                {/* Boutons Auth */}
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
            </div>
        </header>
    );
}
