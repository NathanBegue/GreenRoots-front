import { Itrees } from "../../../type/type.ts";



export default function Card({
  article,
  isAdmin = true,
  isSmall = false,
  setIsOpenedEditModal,
  setIsOpenedDeleteModal,
  setIsOpenDetail,
  setSelectedArticle,
}: {
  isAdmin?: boolean;
  isSmall?: boolean; // Gère le format compact ET la suppression des boutons
  setIsOpenedEditModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenedDeleteModal?: React.Dispatch<React.SetStateAction<boolean>>;
  article: Itrees;
  setIsOpenDetail?: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedArticle: React.Dispatch<React.SetStateAction<Itrees | null>>;
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

        <p className={`font-content text-2xl max-sm:text-base pt-4 ${isSmall ? "text-sm" : "text-xl font-bold"}`}>{article.name}</p>
      </div>


      <div className={"flex justify-between items-center w-full pb-4 p-4 min-sm:gap-4"}>
        {/* Supprime tous les boutons si isSmall est activé */}
        {!isSmall &&
          (isAdmin ? (
            <div className="flex gap-2 mt-2">
              <button onClick={() => {
                setIsOpenedEditModal && setIsOpenedEditModal(true);
                setSelectedArticle && setSelectedArticle(article);
              }

              }
              className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition md:w-8 lg:w-10 lg:h-12">
                <img src="/images/icons/edit.svg" alt="Modifier" className="w-6 h-6 invert" />
              </button>

              <button onClick={() => {
                setIsOpenedDeleteModal && setIsOpenedDeleteModal(true);
                setSelectedArticle && setSelectedArticle(article);
              }}
              className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition lg:w-10 lg:h-12 md:w-8 mr-2 ">
                <img src="/images/icons/trash.svg" alt="Supprimer" className="w-6 h-6 invert " />
              </button>
            </div>
          ) : (
            // Bouton d’ajout au panier pour l’utilisateur normal
            <button className="flex items-center bg-cta p-2 rounded-lg hover:bg-cta-dark transition">
              <img src="/images/icons/shop-card.svg" alt="Ajouter au panier" className="w-6 h-6 invert" />
            </button>
          ))
        }
        <p className="font-content font-semibold text-xs min-[374px]:text-base text-cta ml-2 border-b-1">{"Prix: " + article.price + " €"}</p>
        <button className="font-content border-2 p-2 border-cta bg-cta rounded-lg drop-shadow-lg max-sm:p-1 max-sm:text-sm min-sm:p-0 min-sm:text-sm min-lg:p-4 min-lg:text-lg"
          onClick={() =>  {
            if (setIsOpenDetail) {
              setIsOpenDetail(true);
            }
            setSelectedArticle(article);
          }}> Détail de l'arbre </button>
      </div>


    </article >
  );
}
