import Card from "../ui/Card";

export default function UserSpace() {
    return (
        <div className="w-full mx-auto p-6 shadow-lg bg-dark-primary text-white pt-20 lg:pt-32">
            {/* Block de modification des informations personnelles */}
            <div>
                <h1 className="text-2xl font-bold text-center mb-6">Espace personnel</h1>

                <div className=" flex flex-row justify-between items-center">
                    <p className="text-lg font-semibold">Mes informations</p>

                    {/* Bouton de suppression du compte (plus discret) */}
                    <button
                        className="bg-dark-accent text-red-400 text-sm flex items-center gap-2 rounded-lg border p-2"
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
                            value={"Léo"}
                            className="border p-3 rounded-lg w-full bg-dark-secondary text-white focus:outline-none focus:ring-2 focus:ring-cta"
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
                            value={"Khatchatourian"}
                            className="border p-3 rounded-lg w-full bg-dark-secondary text-white focus:outline-none focus:ring-2 focus:ring-cta"
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
                            value={"25"}
                            className="border p-3 rounded-lg w-full bg-dark-secondary text-white focus:outline-none focus:ring-2 focus:ring-cta"
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
                            value={"contact.leokha@gmail.com"}
                            className="border p-3 rounded-lg w-full bg-dark-secondary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                            required
                        />
                    </div>

                    {/* Bouton de mise à jour */}
                    <button
                        type="submit"
                        className="bg-cta text-white py-3 px-6 rounded-lg w-full font-bold hover:bg-cta-dark transition"
                    >
                        Mettre à jour mes informations
                    </button>
                </form>
            </div>

            {/* Block Historique des commandes */}
            <div className="mt-10">
                <h3 className="text-xl font-bold text-center mb-4">🛒 Mes dernières commandes</h3>

                <div className="bg-dark-secondary p-4 rounded-lg shadow-lg">
                    <p className="text-lg font-semibold text-cta">Commande du 10/02/2025</p>

                    {/* Liste des articles (cartes plus petites) */}
                    <div className="flex flex-col gap-4 mt-4">
                        <Card isSmall={true} />
                        <Card isSmall={true} />
                    </div>

                    {/* Total de la commande */}
                    <div className="flex justify-between items-center mt-6 border-t border-gray-600 pt-4">
                        <p className="text-lg font-semibold">Total :</p>
                        <p className="text-xl font-bold text-cta">105.92 €</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
