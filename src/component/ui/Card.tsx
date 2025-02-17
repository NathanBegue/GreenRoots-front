import { Itrees } from "../../../type/type.ts";
import useCartStore from "../../Auth/cartStore.ts";

export default function Card({
  article,
  isSmall = false,
  setIsOpenedEditModal,
  setIsOpenedDeleteModal,
  setSelectedArticle,
  isAdmin
}: {
  isSmall?: boolean; // Gère le format compact ET la suppression des boutons
  setIsOpenedEditModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenedDeleteModal?: React.Dispatch<React.SetStateAction<boolean>>;
  article: Itrees;
  setSelectedArticle?: React.Dispatch<React.SetStateAction<Itrees | null>>;
  isAdmin: boolean;
}) {

  const addToCart = useCartStore((state) => state.addToCart);

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
      <p className={`font-title text-3xl min-[374px]:text-base pt-4 ${isSmall ? "text-sm" : "text-xl font-bold"}`}>{article.name}</p>
      <div className={`flex justify-between items-center w-full pb-4`}>
        <p className="font-semibold text-xs min-[374px]:text-base text-cta ml-2">{`Prix: ` + article.price}</p>

        {/* Supprime tous les boutons si isSmall est activé */}
        {!isSmall &&
          (isAdmin ? (
            <div className="flex gap-2 mt-2">
              <button onClick={() => {
                setIsOpenedEditModal && setIsOpenedEditModal(true);
                setSelectedArticle && setSelectedArticle(article)
              }

              }
                className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition md:w-8 lg:w-10 lg:h-12">
                <img src="/images/icons/edit.svg" alt="Modifier" className="w-6 h-6 invert" />
              </button>

              <button onClick={() => {
                setIsOpenedDeleteModal && setIsOpenedDeleteModal(true)
                setSelectedArticle && setSelectedArticle(article)
              }}
                className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition lg:w-10 lg:h-12 md:w-8 mr-2">
                <img src="/images/icons/trash.svg" alt="Supprimer" className="w-6 h-6 invert " />
              </button>
            </div>
          ) : (
            // Bouton d’ajout au panier pour l’utilisateur normal
            <button className="flex items-center bg-cta p-2 rounded-lg hover:bg-cta-dark transition" onClick={() => addToCart(article)}>
              <img src="/images/icons/shop-card.svg" alt="Ajouter au panier" className="w-6 h-6 invert" />
            </button>
          ))
        }

      </div>


    </article >
  );
}
