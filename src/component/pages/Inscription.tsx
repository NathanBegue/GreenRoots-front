export default function Inscription() {
    return (
        <div className="w-full px-6 py-10 shadow-lg pt-24 bg-dark-primary text-white">
            <h1 className="text-2xl font-bold text-center mb-6 md:text-3xl">Bienvenue</h1>

            <form action="" className="flex flex-col gap-6">
                {/* Prénom */}
                <div className="flex flex-col">
                    <label htmlFor="firstname" className="font-semibold mb-1 md:text-xl">Prénom</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        placeholder="Entrez votre prénom"
                        className="border p-3 rounded-lg w-full bg-dark-secondary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                        required
                    />
                </div>

                {/* Nom */}
                <div className="flex flex-col">
                    <label htmlFor="lastname" className="font-semibold mb-1 md:text-xl">Nom</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        placeholder="Entrez votre nom"
                        className="border p-3 rounded-lg w-full bg-dark-secondary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                        required
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="mail" className="font-semibold mb-1 md:text-xl">Adresse e-mail</label>
                    <input
                        type="email"
                        id="mail"
                        name="mail"
                        placeholder="Entrez votre adresse e-mail"
                        className="border p-3 rounded-lg w-full bg-dark-secondary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                        required
                    />
                </div>

                {/* Mot de passe */}
                <div className="flex flex-col">
                    <label htmlFor="password" className="font-semibold mb-1 md:text-xl">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Choisissez un mot de passe"
                        className="border p-3 rounded-lg w-full bg-dark-secondary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                        required
                    />
                </div>

                {/* Confirmation du mot de passe */}
                <div className="flex flex-col">
                    <label htmlFor="confirmation" className="font-semibold mb-1 md:text-xl">Confirmer le mot de passe</label>
                    <input
                        type="password"
                        id="confirmation"
                        name="confirmation"
                        placeholder="Confirmez votre mot de passe"
                        className="border p-3 rounded-lg w-full bg-dark-secondary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                        required
                    />
                </div>

                {/* Bouton d'inscription */}
                <button
                    type="submit"
                    className="bg-cta text-white py-3 px-6 rounded-lg w-full font-bold hover:bg-cta-dark transition"
                >
                    Inscription
                </button>
            </form>
        </div>
    );
}
