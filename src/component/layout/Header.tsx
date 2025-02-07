export default function Header() {
    return (
        <header className="bg-dark-secondary w-full h-16 px-6 flex items-center justify-between overflow-hidden fixed">
            {/* Icône de gauche */}
            <div className="flex items-center gap-4 flex-nowrap">
                <img className="w-6 h-6 invert" src="/images/icons/user.svg" alt="Profil" />
                <img className="w-6 h-6 invert" src="/images/icons/moon.svg" alt="Mode sombre" />
            </div>

            {/* Logo */}
            <div><img className="h-8" src="/images/icons/logo-.svg" alt="Logo" /></div>

            {/* Icônes de droite */}
            <div className="flex items-center gap-4 flex-nowrap">
                <img className="w-6 h-6 invert" src="/images/icons/shop-card.svg" alt="Panier" />
                <img className="w-6 h-6 invert" src="/images/icons/burger-menu.svg" alt="Menu" />
            </div>
        </header>
    )
}
