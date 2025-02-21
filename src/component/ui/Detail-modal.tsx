import { Itrees } from "../../../type/type";
import useCartStore from "../../Auth/cartStore";

interface DetailModalProps {
  setIsOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
  article: Itrees;
  isOpenOrderDetail: boolean;
  isDarkMode: boolean;
}

export default function DetailModal({
  setIsOpenDetail,
  article,
  isOpenOrderDetail,
  isDarkMode,
}: DetailModalProps) {

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <>
      {/* Overlay pour fermer la modale en cliquant à l'extérieur */}

      {isOpenOrderDetail && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setIsOpenDetail(false)}
        />
      )}

      {/* Modale */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? " bg-dark-secondary" : "bg-light-accent"} w-80 p-6 rounded-lg shadow-lg text-white flex flex-col gap-4 z-20 mt-8 md:w-md lg:w-lg`} style={{ maxHeight: "80vh", overflowY: "auto" }}>

        {/* Bouton de fermeture */}
        <img
          onClick={() => setIsOpenDetail(false)}
          src="/images/icons/close.svg"
          alt="Fermer la modale"
          className={`w-6 h-6 ${isDarkMode && "invert"} absolute top-4 right-4 cursor-pointer `}
        />

        {/* Titre */}
        <h1 className={`text-2xl font-bold text-center ${isDarkMode ? " text-white" : "text-black"} `}>Détail de l'arbre </h1>
        <h2 className={`text-xl font-bold text-center font-title ${isDarkMode ? "text-white" : "text-black"} `}>{article.name} </h2>

        <div className="flex flex-col gap-4">
          {/* Image URL */}
          <div className="flex flex-col ">
            <img className="h-56 md:h-100" src={article.Picture ? article.Picture.url : "/images/default.jpg"}
              alt={article.name} />
          </div>
          {/* Catégorie */}
          <div className={`flex flex-col ${isDarkMode ? "text-white" : "text-black"} `}>
            <h3 className="font-semibold mb-1 font-title">Catégories :</h3>
            <ul className="list-disc pl-4 font-content">
              {article.categories.map((category, index) => (
                <li key={index}>{category.name}</li>
              ))}
            </ul>
          </div>


          {/* Description */}
          <div className={`flex flex-col mb-4 ${isDarkMode ? "text-white" : "text-black"} `}>
            <h3 className="font-semibold mb-1 font-title">Description :</h3>
            <p className="font-content"> {article.description}</p>

            {/* Prix */}
            <div className="flex flex-col mt-4">
              <h3 className="font-semibold mb-1 font-content">Prix : {article.price} €</h3>
            </div>

          </div>
          <div className="flex justify-center">
            <button onClick={() => addToCart(article)} className={`flex items-center ${isDarkMode ? "bg-dark-primary" : "bg-light-primary"}  p-2  rounded-sm md:rounded-md lg:rounded-lg cursor-pointer hover:scale-110`}> Ajouter au panier </button>
          </div>

        </div>
      </div>

    </>
  );
}