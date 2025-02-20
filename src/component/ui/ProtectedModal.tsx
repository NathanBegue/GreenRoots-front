export default function ProtectedModal({ isDarkMode, setIsProtectedModal }:
    { isDarkMode: boolean, setIsProtectedModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 z-10"
                onClick={setIsProtectedModal(false)}
            />

            {/* Modale */}
            <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} w-96 p-6 rounded-lg shadow-lg flex flex-col gap-6 z-20`}>

                {/* Bouton de fermeture */}
                <img
                    onClick={setIsProtectedModal(false)}
                    src="/images/icons/close.svg"
                    alt="Fermer la modale"
                    className={`w-6 h-6 ${isDarkMode && "invert"} absolute top-4 right-4 cursor-pointer`}
                />

                {/* Texte de la modale */}
                <h2 className="text-xl font-bold text-center">Connexion requise</h2>
                <p className="text-center text-gray-500">Vous devez être connecté pour accéder à l'historique.</p>

                {/* Boutons d'action */}
                <div className="flex justify-between">
                    <p className="font-content md:text-lg">Deja un compte ?</p>
                    <button
                        className={`px-4 py-1 rounded-lg bg-dark-primary  cursor-pointer hover:scale-110 text-lg ${!isDarkMode && "bg-light-primary text-black"}`}
                        onClick={setIsProtectedModal(false)}
                    >
                        Se connecter
                    </button>
                    <button
                        className={`px-4 py-1 rounded-lg bg-dark-primary  cursor-pointer hover:scale-110 text-lg ${!isDarkMode && "bg-light-primary text-black"}`}
                        onClick={setIsProtectedModal(false)}
                    >
                        S'inscrire
                    </button>
                </div>
            </div>
        </>
    );
}