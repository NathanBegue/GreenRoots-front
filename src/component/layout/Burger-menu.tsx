export default function BurgerMenu() {
    return (
        <nav className="bg-dark-accent text-white w-50 h-dvh z-10 absolute  right-0 flex flex-col justify-between items-center gap-6 pb-6 pt-16">
            <ul className="flex flex-col gap-1 w-full">
                <li className="border-b pl-2 font-title font-bold text-3xl"><a href="">Accueil</a></li>
                <li className="border-b pl-2 font-title font-bold text-3xl"><a href="">Boutique</a></li>
                <li className="border-b pl-2 font-title font-bold text-3xl"><a href="">Historique</a></li>
            </ul>
            <div className="flex flex-col gap-6">
                <p className="text-center font-title font-bold"><a href="">CGU</a></p>
                <ul className="flex flex-row gap-6">
                    <li><a href=""><img className="w-6 h-6 invert" src="/images/icons/facebook.svg" alt="" /></a></li>
                    <li><a><img className="w-6 h-6 invert" src="/images/icons/instagram.svg" alt="" /></a></li>
                    <li><a><img className="w-6 h-6 invert" src="/images/icons/linkedin.svg" alt="" /></a></li>
                </ul>
            </div>
        </nav>
    )
}