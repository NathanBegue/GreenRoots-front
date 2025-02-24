import { useEffect, useState } from "react";
import fetchmethod from "../../fetch/method-fetch";
import { IUserInfos } from "../../../type/type";
import DeleteAccountModal from "../ui/DeleteAccountModal";

export default function UserSpace({ isDarkMode }: { isDarkMode: boolean }) {

    const [isOpenedDeleteAccountModal, setIsOpenedDeleteAccountModal] = useState<boolean>(false);


    const [formData, setFormData] = useState<IUserInfos>({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        repeat_password: ""
    });


    const [statusMessage, setStatusMessage] = useState<string>("");

    useEffect(() => {
        // Récupération des informations utilisateur
        fetchmethod.getUserInfos().then((data: IUserInfos) => {
            setFormData((prev) => ({
                ...prev,
                firstname: data.firstname || "",
                lastname: data.lastname || "",
                email: data.email || "",
            }));
        });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validation des champs obligatoires
        if (!formData.firstname.trim() || !formData.lastname.trim() || !formData.email.trim()) {
            setStatusMessage("Tous les champs obligatoires doivent être remplis.");
            return;
        }

        // Vérifie les mots de passe
        if (formData.password) {
            if (!formData.repeat_password) {
                setStatusMessage("Veuillez confirmer votre mot de passe.");
                return;
            }

            if (formData.password !== formData.repeat_password) {
                setStatusMessage("Les mots de passe ne correspondent pas.");
                return;
            }
        }

        // Prépare le payload (filtre les champs vides)
        const payload = Object.fromEntries(
            Object.entries(formData).filter(([, value]) => value && value.trim() !== "")
        );

        try {
            const response = await fetch('http://localhost:3000/compte', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erreur API :", errorData);
                setStatusMessage(`Erreur : ${errorData.error || "Échec de la mise à jour."}`);
                return;
            }

            const updatedUser = await response.json();
            setStatusMessage("Informations mises à jour avec succès !");
            setFormData((prev) => ({
                ...prev,
                firstname: updatedUser.firstname || "",
                lastname: updatedUser.lastname || "",
                email: updatedUser.email || "",
                password: "",
                repeat_password: ""
            }));
        } catch (error) {
            console.error("Erreur réseau :", error);
            setStatusMessage("Erreur lors de la mise à jour. Veuillez réessayer.");
        }
    };

    return (
        <div className={`w-5/6 min-h-screen mx-auto p-6 shadow-lg  lg:w-lg 2xl:w-4xl ${isDarkMode ? "bg-dark-primary text-white" : "bg-light-primary text-black"} pt-20 lg:pt-48`}>
            <div>
                <h1 className="text-2xl font-bold text-center mb-6">Espace personnel</h1>

                <div className="flex flex-row justify-between items-center">
                    <p className="text-lg font-semibold">Mes informations</p>
                    <button
                        onClick={() => setIsOpenedDeleteAccountModal(true)}
                        className={`${isDarkMode ? "bg-dark-accent text-red-400" : "bg-red-600 text-black"} text-sm flex items-center gap-2 rounded-lg border p-1  cursor-pointer transition hover:scale-105`}
                    >
                        Supprimer mon compte
                    </button>
                </div>

                {
                    isOpenedDeleteAccountModal && <DeleteAccountModal
                        isDarkMode={isDarkMode}
                        setIsOpenedDeleteAccountModal={setIsOpenedDeleteAccountModal}
                        user={formData}
                        setUser={setFormData}

                    />
                }

                {/* Message de statut */}
                {statusMessage && (
                    <p className="text-center my-4 text-green-500 font-semibold">{statusMessage}</p>
                )}

                {/* Formulaire utilisateur */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                    {/* Prénom */}
                    <div className="flex flex-col">
                        <label htmlFor="firstname" className="font-semibold mb-1">Prénom</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="Entrez votre prénom"
                            onChange={handleChange}
                            value={formData?.firstname || ""}
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
                            value={formData?.lastname || ""}
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
                            value={formData?.email || ""}
                            className={`border p-3 rounded-lg w-full ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} focus:outline-none focus:ring-2 focus:ring-cta`}
                            required
                        />
                    </div>

                    {/* Nouveau mot de passe */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-semibold mb-1">Nouveau mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Entrez un nouveau mot de passe"
                            onChange={handleChange}
                            value={formData?.password || ""}
                            className={`border p-3 rounded-lg w-full ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} focus:outline-none focus:ring-2 focus:ring-cta`}
                        />
                    </div>

                    {/* Confirmation du mot de passe */}
                    <div className="flex flex-col">
                        <label htmlFor="repeat_password" className="font-semibold mb-1">Confirmer le mot de passe</label>
                        <input
                            type="password"
                            id="repeat_password"
                            name="repeat_password"
                            placeholder="Confirmez le mot de passe"
                            onChange={handleChange}
                            value={formData?.repeat_password || ""}
                            className={`border p-3 rounded-lg w-full ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} focus:outline-none focus:ring-2 focus:ring-cta`}
                        />
                    </div>

                    {/* Bouton de mise à jour */}
                    <button
                        type="submit"
                        className={` ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} mt-20 py-3 px-6 rounded-lg w-full font-bold hover:bg-cta-dark cursor-pointer transition hover:scale-105`}
                    >
                        Mettre à jour mes informations
                    </button>
                </form>
            </div>
        </div>
    );
}
