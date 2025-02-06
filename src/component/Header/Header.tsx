export default function Header() {
    return (
        <header className="bg-dark-secondary w-full h-16 px-6 flex items-center justify-between overflow-hidden">
            {/* Icône de mode */}
            <div>
                <img className="w-6 h-6 invert" src="/images/icons/moon.svg" alt="Mode sombre" />
            </div>


            {/* Icônes de droite */}
            <div className="flex items-center gap-4 flex-nowrap">
                <img className="h-8" src="/images/icons/logo-.svg" alt="Logo" />
                <img className="w-6 h-6 invert" src="/images/icons/user.svg" alt="Profil" />
                <img className="w-6 h-6 invert" src="/images/icons/shop-card.svg" alt="Panier" />
                <img className="w-6 h-6 invert" src="/images/icons/burger-menu.svg" alt="Menu" />
            </div>
        </header>
    )
}
