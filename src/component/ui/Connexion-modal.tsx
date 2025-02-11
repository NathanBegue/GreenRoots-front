import { Link } from "react-router";

export default function ConnexionModal({ isModalOpened, setIsModalOpened }: { isModalOpened: boolean, setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            {/* Overlay qui ferme la modale en cliquant à l'extérieur */}
            {isModalOpened && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsModalOpened(false)}
                />
            )}

            {/* Modale centrée avec `e.stopPropagation()` pour empêcher la fermeture au clic */}
            <div
                className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-secondary bg-opacity-90 w-64 h-auto p-6 rounded-lg text-center shadow-lg text-white flex flex-col justify-between items-center gap-4 z-30 md:p-10 md:w-96 md:gap-6 md:rounded-xl md:top-1/2"
                onClick={(e) => e.stopPropagation()} // Empêche l'overlay de capter le clic
            >

                {/* Logo de fermeture X */}
                <img
                    onClick={() => setIsModalOpened(false)}
                    className="w-8 h-8 invert absolute top-4 right-4 cursor-pointer md:w-10 md:h-10 md:top-9 md:right-6"
                    src="/images/icons/close.svg"
                    alt="Fermer"
                />


                <div className="flex flex-col gap-2 min-w-34">
                    <p className="font-content md:text-lg">Déjà un compte ?</p>
                    <Link
                        to="/connexion"
                        className="bg-cta py-2 px-4 rounded-sm font-title font-bold md:py-3 md:px-6 md:text-lg rouded-lg"
                        onClick={() => setIsModalOpened(false)} // Ferme la modale avant de naviguer
                    >
                        Connexion
                    </Link>
                </div>

                <div className="flex flex-col gap-2 min-w-34">
                    <p className="font-content md:text-lg">S'enregistrer</p>
                    <Link
                        to="/inscription"
                        className="bg-cta py-2 px-4 rounded-sm font-title font-bold md:py-3 md:px-6 md:text-lg rouded-lg"
                        onClick={() => setIsModalOpened(false)} // Ferme la modale avant de naviguer
                    >
                        S'inscrire
                    </Link>
                </div>
            </div>
        </>
    );
}
