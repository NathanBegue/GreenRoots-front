import { Link } from "react-router";

export default function Connexion() {
    return (
        <div className="w-full min-h-[calc(100vh-37px)] px-6 py-10 shadow-lg pt-24 bg-dark-primary text-white">

            <h1 className="text-2xl font-bold text-center mb-20">Rebonjour</h1>

            <form action="" className="flex flex-col gap-6 pt-20">
                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="mail" className="font-semibold mb-1">Adresse e-mail</label>
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
                    <label htmlFor="password" className="font-semibold mb-1">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Choisissez un mot de passe"
                        className="border p-3 rounded-lg w-full bg-dark-secondary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                        required
                    />
                    {/* Lien Mot de passe oublié */}
                    <Link to="/mot-de-passe-oublie" className="text-sm text-cta hover:underline pt-2 self-end">
                        Mot de passe oublié ?
                    </Link>
                </div>

                {/* Bouton de connexion */}
                <button
                    type="submit"
                    className="bg-cta text-white py-3 px-6 rounded-lg w-full font-bold hover:bg-cta-dark transition"
                >
                    Connexion
                </button>
            </form>
        </div>
    );
}
