import { Itrees } from "../../../type/type.ts";

export default function Card({
    article,
    isAdmin = true,
    isSmall = false,
    setIsOpenedEditModal,
    setIsOpenedDeleteModal
}: {
    isAdmin?: boolean;
    isSmall?: boolean; // Gère le format compact ET la suppression des boutons
    setIsOpenedEditModal?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenedDeleteModal?: React.Dispatch<React.SetStateAction<boolean>>;
    article: Itrees;
}) {
    return (
        <article
            className={`bg-dark-secondary text-white flex ${isSmall ? "flex-row items-center p-2 gap-2 w-full max-w-sm" : "flex-col"} 
            rounded-lg border shadow-black shadow-lg md:max-w-4xl`}
        >
            {/* Image du produit */}
            <div>
                <img
                    className={`object-cover rounded-lg aspect-square ${isSmall ? "w-12 h-12" : ""}`}
                    src={article.Picture ? `/images/arbres/${article.Picture.url}.webp` : "/images/default.jpg"}
                    alt={article.name}
                />

            </div>

            {/* Contenu de la carte */}
            <div className={`flex ${isSmall ? "items-center gap-2" : "gap-4"} justify-between items-center w-full p-4`}>
                <p className={`font-title text-xs min-[374px]:text-base ${isSmall ? "text-sm" : "text-xl font-bold"}`}>{article.name}</p>
                <p className="font-semibold text-xs min-[374px]:text-base text-cta">{`Prix: ` + article.price}</p>

                {/* Supprime tous les boutons si isSmall est activé */}
                {!isSmall &&
                    (isAdmin ? (
                        <div className="flex gap-2">
                            <button onClick={() => setIsOpenedEditModal && setIsOpenedEditModal(true)}
                                className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition">
                                <img src="/images/icons/edit.svg" alt="Modifier" className="w-6 h-6 invert" />
                            </button>

                            <button onClick={() => setIsOpenedDeleteModal && setIsOpenedDeleteModal(true)}
                                className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition">
                                <img src="/images/icons/trash.svg" alt="Supprimer" className="w-6 h-6 invert" />
                            </button>
                        </div>
                    ) : (
                        // Bouton d’ajout au panier pour l’utilisateur normal
                        <button className="flex items-center bg-cta p-2 rounded-lg hover:bg-cta-dark transition">
                            <img src="/images/icons/shop-card.svg" alt="Ajouter au panier" className="w-6 h-6 invert" />
                        </button>
                    ))
                }
            </div>
        </article>
    );
}
