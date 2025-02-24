import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../Auth/authStore";
import { showSuccessToast } from "../../../utils/toast";

export default function ConnexionModal({ isModalOpened, setIsModalOpened, isDarkMode }: {
    isModalOpened: boolean,
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>
    isDarkMode: boolean,
}) {

    const { token, logout } = useAuthStore();
    const navigate = useNavigate();


    return (
        <>
            {/* Overlay qui ferme la modale en cliquant à l'extérieur */}
            {isModalOpened && (
                <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsModalOpened(false)}
                />
            )}

            {/* Modale */}
            <div
                className={`fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} bg-opacity-90 w-64 h-auto p-6 rounded-lg text-center shadow-lg flex flex-col justify-between items-center gap-4 z-30 md:p-10 md:w-96 md:gap-6 md:rounded-xl md:top-1/2`}
                onClick={(e) => e.stopPropagation()}
            >


                {/* Logo de fermeture X */}
                <img
                    onClick={() => setIsModalOpened(false)}
                    className={`w-8 h-8 absolute top-4 right-4 cursor-pointer md:w-10 md:h-10 md:top-9 md:right-6 ${isDarkMode && "invert"}`}
                    src="/images/icons/close.svg"
                    alt="Fermer"
                />

                {/* Condition : Si l'utilisateur est connecté, afficher "Mon Compte" et "Déconnexion" */}
                {token ? (
                    <>
                        <div className="flex flex-col gap-2 min-w-34">
                            <p className="font-content md:text-lg">Accéder à votre compte</p>
                            <Link
                                to="/compte"
                                className={`flex justify-center items-center px-10  ${isDarkMode ? "bg-dark-primary" : "bg-light-primary"} mx-10  p-2  rounded-sm md:rounded-md lg:rounded-lg cursor-pointer hover:scale-110`}
                                onClick={() => setIsModalOpened(false)}
                            >
                                Mon Compte
                            </Link>
                        </div>

                        <div className="flex flex-col gap-2 min-w-34">
                            <p className="font-content md:text-lg">Vous souhaitez quitter ?</p>
                            <button
                                className="bg-red-500 py-2 px-4 rounded-sm font-title font-bold md:py-3 md:px-6 md:text-lg"
                                onClick={() => {
                                    logout(); // Déconnexion
                                    setIsModalOpened(false);
                                    showSuccessToast("Vous etes déconnecté");
                                    navigate("/");
                                }}
                            >
                                Déconnexion
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/*Affichage par défaut si l'utilisateur N'EST PAS connecté */}
                        <div className="flex flex-col gap-2 min-w-34">
                            <p className="font-content md:text-lg">Déjà un compte ?</p>
                            <Link
                                to="/connexion"
                                className={`flex justify-center items-center px-10 ${isDarkMode ? "bg-dark-primary" : "bg-light-primary"} mx-10  p-2  rounded-sm md:rounded-md lg:rounded-lg cursor-pointer hover:scale-110`}
                                onClick={() => setIsModalOpened(false)}
                            >
                                Connexion
                            </Link>
                        </div>


                        <div className="flex flex-col gap-2 min-w-34">
                            <p className="font-content md:text-lg">S'enregistrer</p>
                            <Link
                                to="/inscription"
                                className={`flex justify-center items-center px-10  ${isDarkMode ? "bg-dark-primary" : "bg-light-primary"} mx-10  p-2  rounded-sm md:rounded-md lg:rounded-lg cursor-pointer hover:scale-110`}
                                onClick={() => setIsModalOpened(false)}
                            >
                                S'inscrire
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </>
    );

}
