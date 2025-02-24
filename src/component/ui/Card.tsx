import { Itrees } from "../../../type/type.ts";
import useCartStore from "../../Auth/cartStore.ts";

export default function Card({
  article,
  isSmall = false,
  setIsOpenedEditModal,
  setIsOpenedDeleteModal,
  setIsOpenDetail,
  setSelectedArticle,
  isDarkMode,
  isAdmin
}: {
  isAdmin?: boolean;
  isSmall?: boolean;
  setIsOpenedEditModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenedDeleteModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenDetail?: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedArticle?: React.Dispatch<React.SetStateAction<Itrees | null>>;
  article: Itrees;
  isDarkMode: boolean;
}) {

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <article
      className={`flex ${isDarkMode ? "bg-dark-secondary dark:text-white" : "bg-light-accent text-black"} ${isSmall ? "flex-row items-center p-2 gap-2 w-full max-w-sm" : "flex-col"} 
            rounded-lg border shadow-black shadow-lg md:max-w-2xl `}
    >

      {/* Image du produit */}
      <div>
        <img
          className={`object-cover rounded-lg aspect-square${isSmall ? "w-12 h-12" : ""}`}
          src={article.Picture ? `${article.Picture.url}` : "/images/default.jpg"}
          alt={article.name}
        />

        <p className={`font-content sm:text-sm md:text-md lg:text-lg ${isSmall ? "text-sm" : "text-xl font-bold"}`}>
          {article.name}
        </p>

        {/* Contenu de la carte */}
        <div className="flex justify-between items-center w-full p-4 sm:gap-4 ">
          {/* Supprime tous les boutons si isSmall est activé */}
          {!isSmall &&
            (isAdmin ? (
              <div className="flex gap-2 p-2">
                <button onClick={() => {
                  setIsOpenedEditModal && setIsOpenedEditModal(true);
                  setSelectedArticle && setSelectedArticle(article);
                }}
                  className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition md:w-8 lg:w-10 lg:h-12 cursor-pointer hover:scale-110">
                  <img src="/images/icons/edit.svg" alt="Modifier" className="w-6 h-6 invert" />
                </button>

                <button onClick={() => {
                  setIsOpenedDeleteModal && setIsOpenedDeleteModal(true);
                  setSelectedArticle && setSelectedArticle(article);
                }}
                  className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition lg:w-10 lg:h-12 md:w-8 mr-2 cursor-pointer hover:scale-110">
                  <img src="/images/icons/trash.svg" alt="Supprimer" className="w-6 h-6 invert " />
                </button>
              </div>
            ) : (
              <button className={`flex items-center ${isDarkMode ? "bg-dark-primary" : "bg-light-primary"}  p-2  rounded-sm md:rounded-md lg:rounded-lg cursor-pointer hover:scale-110`}
                onClick={() => addToCart(article)}>
                <img src="/images/icons/shop-card.svg" alt="Ajouter au panier" className="w-6 h-6 invert" />
              </button>
            ))
          }
          <p className={`font-semibold text-xs min-[374px]:text-base ${isDarkMode ? "text-white" : "text-black"} ml-2`}>
            {`Prix: ` + article.price + " €"}
          </p>
        </div>
      </div>
      {/* Bouton détail */}
      <button className={`font-content border-2 ${isDarkMode ? "bg-dark-primary border-dark-primary" : "bg-light-primary border-light-primary"}  rounded-sm md:rounded-md lg:rounded-lg drop-shadow-lg 
          sm:p-1 sm:text-sm md:text-md  lg:text-lg cursor-pointer hover`}
        onClick={() => {
          if (setIsOpenDetail) setIsOpenDetail(true);
          setSelectedArticle && setSelectedArticle(article);
        }}>
        Détail de l'arbre
      </button>
    </article>
  );
}
