export default function DesktopHeader() {
    return (
        <header className="bg-dark-secondary w-full h-20 px-8 flex items-center justify-between shadow-lg">
            {/* Logo */}
            <img className="h-12" src="/images/icons/logo-.svg" alt="Logo" />

            {/* Navigation */}
            <nav>
                <ul className="flex gap-8 text-white font-title text-lg">
                    <li className="hover:text-cta transition"><a href="/">Accueil</a></li>
                    <li className="hover:text-cta transition"><a href="/boutique">Boutique</a></li>
                    <li className="hover:text-cta transition"><a href="/historique">Historique</a></li>
                </ul>
            </nav>

            {/* Icônes et Actions */}
            <div className="flex items-center gap-6">
                <img className="h-8 invert cursor-pointer hover:scale-110 transition" src="/images/icons/moon.svg" alt="Mode sombre" />
                <a href="/panier">
                    <img className="h-8 invert cursor-pointer hover:scale-110 transition" src="/images/icons/shop-card.svg" alt="Panier" />
                </a>

                {/* Boutons Auth */}
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-dark-primary text-white rounded-lg border border-cta hover:bg-cta hover:text-dark-secondary transition">
                        Inscription
                    </button>
                    <button className="px-4 py-2 bg-cta text-white rounded-lg hover:bg-cta-dark transition">
                        Connexion
                    </button>
                </div>
            </div>
        </header>
    );
}
