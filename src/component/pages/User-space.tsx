import { useEffect, useState } from "react";
import fetchmethod from "../../fetch/method-fetch";
import { Iorder, IUserInfos } from "../../../type/type";

export default function UserSpace({ isDarkMode }: { isDarkMode: boolean }) {
    const [orders, setOrders] = useState<Iorder[]>([]);

    // State pour les infos utilisateur récupérées depuis l'API
    const [userInfos, setUserInfos] = useState<IUserInfos>({
        firstname: "",
        lastname: "",
        age: 0,
        email: "",
    });

    // State pour les données du formulaire, typé explicitement comme IUserInfos
    const [formData, setFormData] = useState<IUserInfos>({
        firstname: userInfos.firstname,
        lastname: userInfos.lastname,
        age: userInfos.age,
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
                age: data.age,
                email: data.email,
            });
        });
        // Récupération des commandes de l'utilisateur
        fetchmethod.getHistoryByUser().then((data: Iorder[]) => setOrders(data));
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
        <div className={`w-full min-h-full mx-auto p-6 shadow-lg ${isDarkMode ? "bg-dark-primary text-white" : "bg-light-primary text-black"} pt-20 lg:pt-48 lg:px-250`}>
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

                    {/* Âge */}
                    <div className="flex flex-col">
                        <label htmlFor="age" className="font-semibold mb-1">Âge</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="Entrez votre âge"
                            onChange={handleChange}
                            value={formData.age}
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

            {/* Block Historique des commandes */}
            <div className="mt-10">
                <h3 className="text-xl font-bold text-center mb-4">🛒 Mes dernières commandes</h3>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className={`${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} p-4 rounded-lg shadow-lg mb-6`}>
                            <p className={`text-lg font-semibold ${isDarkMode ? "text-cta" : "text-black"} `}>
                                Commande du {order.date}
                            </p>

                            {/* Total de la commande */}
                            <div className="flex justify-between items-center mt-6 border-t border-gray-600 pt-4">
                                <p className="text-lg font-semibold">Total :</p>
                                <p className={`text-xl font-bold ${isDarkMode ? "text-cta" : "text-black"} `}>{order.total_price} €</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Aucune commande à afficher.</p>
                )}
            </div>
        </div>
    );
}
