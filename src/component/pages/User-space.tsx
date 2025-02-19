import { useEffect, useState } from "react";
import fetchmethod from "../../fetch/method-fetch";
import { IUserInfos } from "../../../type/type";

export default function UserSpace({ isDarkMode }: { isDarkMode: boolean }) {

    // State pour les infos utilisateur récupérées depuis l'API
    const [userInfos, setUserInfos] = useState<IUserInfos>({
        firstname: "",
        lastname: "",
        email: "",
    });

    // State pour les données du formulaire, typé explicitement comme IUserInfos
    const [formData, setFormData] = useState<IUserInfos>({
        firstname: userInfos.firstname,
        lastname: userInfos.lastname,
        email: userInfos.email,
    });

    useEffect(() => {
        // Récupération des informations utilisateur
        fetchmethod.getUserInfos().then((data: IUserInfos) => {
            setUserInfos(data);
            // Mettre à jour formData avec les infos récupérées
            setFormData({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
            });
        });
        // Récupération des commandes de l'utilisateur
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            // Convertir en nombre si c'est l'âge
            [name]: name === "age" ? Number(value) : value,
        }));
    };

    return (
        <div className={`w-full min-h-full mx-auto p-6 shadow-lg ${isDarkMode ? "bg-dark-primary text-white" : "bg-light-primary text-black"} pt-20 lg:pt-48 `}>
            {/* Block de modification des informations personnelles */}
            <div>
                <h1 className="text-2xl font-bold text-center mb-6">Espace personnel</h1>

                <div className="flex flex-row justify-between items-center">
                    <p className="text-lg font-semibold">Mes informations</p>
                    <button
                        className={`${isDarkMode ? "bg-dark-accent text-red-400" : "bg-red-600 text-black"} text-sm flex items-center gap-2 rounded-lg border p-1`}
                    >
                        Supprimer mon compte
                    </button>
                </div>

                {/* Formulaire utilisateur */}
                <form action="" className="flex flex-col gap-4 mt-6">
                    {/* Prénom */}
                    <div className="flex flex-col">
                        <label htmlFor="firstname" className="font-semibold mb-1">Prénom</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="Entrez votre prénom"
                            onChange={handleChange}
                            value={formData.firstname}
                            className={`border p-3 rounded-lg w-full ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} focus:outline-none focus:ring-2 focus:ring-cta`}
                            required
                        />
                    </div>

                    {/* Nom */}
                    <div className="flex flex-col">
                        <label htmlFor="lastname" className="font-semibold mb-1">Nom</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Entrez votre nom"
                            onChange={handleChange}
                            value={formData.lastname}
                            className={`border p-3 rounded-lg w-full ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} focus:outline-none focus:ring-2 focus:ring-cta`}
                            required
                        />
                    </div>



                    {/* Email */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Entrez votre adresse e-mail"
                            onChange={handleChange}
                            value={formData.email}
                            className={`border p-3 rounded-lg w-full ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} focus:outline-none focus:ring-2 focus:ring-cta`}
                            required
                        />
                    </div>

                    {/* Bouton de mise à jour */}
                    <button
                        type="submit"
                        className={`bg-cta text-white py-3 px-6 rounded-lg w-full font-bold hover:bg-cta-dark transition `}
                    >
                        Mettre à jour mes informations
                    </button>
                </form>
            </div>
        </div>
    );
}
