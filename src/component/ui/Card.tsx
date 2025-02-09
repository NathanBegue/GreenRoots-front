export default function Card({ isAdmin = true, setIsOpenedEditModal }: { isAdmin: boolean, setIsOpenedEditModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <article className="bg-dark-secondary text-white flex flex-col items-center rounded-lg border shadow-black shadow-lg">
            {/* Image du produit */}
            <div>
                <img className="object-cover rounded-t-lg" src="/images/arbres/chene_pedoncule.webp" alt="Chêne pédonculé" />
            </div>

            {/* Contenu de la carte */}
            <div className="flex gap-4 items-center justify-between w-full p-4">
                <p className="text-xl font-bold font-title">Chêne pédonculé</p>

                {/* Boutons spécifique pour l'admin */}

                {isAdmin ? (
                    <div className="flex gap-2">
                        <button onClick={() => setIsOpenedEditModal(true)} className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition">
                            <img src="/images/icons/edit.svg" alt="Modifier" className="w-6 h-6 invert" />
                        </button>
                        <button className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition">
                            <img src="/images/icons/trash.svg" alt="Supprimer" className="w-6 h-6 invert" />
                        </button>
                    </div>
                ) : (
                    // Bouton d’ajout au panier pour l’utilisateur normal
                    <button className="flex items-center bg-cta p-2 rounded-lg hover:bg-cta-dark transition">
                        <img src="/images/icons/shop-card.svg" alt="Ajouter au panier" className="w-6 h-6 invert" />
                    </button>
                )}
            </div>
        </article>
    );
}
