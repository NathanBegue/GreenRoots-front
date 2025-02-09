import { Link } from "react-router";

export default function Panier() {
    return (
        <div className="bg-dark-primary text-white px-6 py-10 w-full min-h-screen flex flex-col gap-6 pt-20">
            <h1 className="text-center">Votre panier</h1>

            {/* Block article */}
            <div className="bg-dark-accent p-4 flex flex-col items-center gap-4 shadow-xl w-full border">
                {/* Bouton de suppression */}
                <img className="w-6 h-6 invert cursor-pointer" src="/images/icons/trash.svg" alt="Supprimer un article" />

                {/* Image de l'article */}
                <img className="size-16 object-cover" src="/images/arbres/ChenePedoncule.webp" alt="Chêne pédonculé" />

                {/* Nom et prix */}
                <div className="text-center flex flex-col">
                    <p className="text-sm font-bold">Chêne pédonculé</p>
                    <p className="text-lg font-semibold">110 €</p>
                </div>

                {/* Sélecteur de quantité */}
                <div className="flex flex-row items-center gap-2">
                    <button className="size-6 flex items-center justify-center bg-dark-secondary border rounded">
                        <img className="size-6 invert" src="/images/icons/chevron-up.svg" alt="Augmenter" />
                    </button>
                    <p className="w-6 text-center">2</p>
                    <button className="size-6 flex items-center justify-center bg-dark-secondary border rounded">
                        <img className="size-6 invert" src="/images/icons/chevron-down.svg" alt="Diminuer" />
                    </button>
                </div>

                {/* Prix total */}
                <p className="text-lg font-semibold">220 €</p>
            </div>

            {/* Block total (facture) */}
            <div className="bg-dark-accent p-6 flex flex-col gap-6 shadow-xl w-full border">
                <div className="flex justify-between">
                    <h2>Total</h2>
                    <p>105.92 €</p>
                </div>
                <form action="">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="" id="" />
                        <p className="text-center">J'accepte les conditions générales de vente</p>
                    </div>
                    <div className="flex flex-col items-center gap-6 pt-4">
                        <Link to="/cgu" className="">CGU</Link>
                        <button className="bg-cta px-4 py-2 rounded-2xl">Payer</button>
                    </div>
                </form>
            </div>

            <Link to="/boutique" className="text-center p-4 bg-cta rounded-lg">Retour à la boutique</Link>
        </div>
    );
}
