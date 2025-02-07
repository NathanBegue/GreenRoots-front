import { Link } from "react-router";

export default function Header() {
    return (
        <header className="bg-dark-secondary w-full h-16 px-6 flex items-center overflow-hidden fixed z-30">

            <div className="flex items-center gap-4 flex-nowrap justify-between w-full">
                <img className="h-8" src="/images/icons/logo-.svg" alt="Logo" />
                <img className="w-6 h-6 invert" src="/images/icons/moon.svg" alt="Mode sombre" />
                <Link to="/panier"><img className="w-6 h-6 invert" src="/images/icons/shop-card.svg" alt="Panier" /> </Link>
                <img className="w-6 h-6 invert" src="/images/icons/user.svg" alt="Profil" />
                <img className="w-6 h-6 invert" src="/images/icons/burger-menu.svg" alt="Menu" />
            </div>
        </header>
    )
}
