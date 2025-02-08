import { Link } from "react-router";

export default function BurgerMenu({ isOpened, setIsOpened }: { isOpened: boolean, setIsOpened: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            {/* Overlay qui ferme le menu en cliquant à l'extérieur */}
            {isOpened && (
                <div
                    className="fixed inset-0  z-10"
                    onClick={() => setIsOpened(false)}
                />
            )}

            <nav className="bg-dark-accent text-white w-50 h-dvh z-10 absolute  right-0 flex flex-col justify-between items-center gap-6 pb-6 pt-16">

                {/* Passage du state a false pour fermé le burger menu une fois cliqué */}

                <ul className="flex flex-col gap-1 w-full">
                    <Link to="/" onClick={() => setIsOpened(false)}><li className="border-b pl-2 font-title font-bold text-3xl">Accueil</li></Link>
                    <Link to="/boutique" onClick={() => setIsOpened(false)}><li className="border-b pl-2 font-title font-bold text-3xl">Boutique</li></Link>
                    <Link to="/historique" onClick={() => setIsOpened(false)}><li className="border-b pl-2 font-title font-bold text-3xl">Historique</li></Link>
                </ul>
                <div className="flex flex-col gap-6">
                    <p className="text-center font-title font-bold"><a href="">CGU</a></p>
                    <ul className="flex flex-row gap-6">
                        <li><a><img className="w-6 h-6 invert" src="/images/icons/facebook.svg" alt="" /></a></li>
                        <li><a><img className="w-6 h-6 invert" src="/images/icons/instagram.svg" alt="" /></a></li>
                        <li><a><img className="w-6 h-6 invert" src="/images/icons/linkedin.svg" alt="" /></a></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}