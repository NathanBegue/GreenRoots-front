/* eslint-disable no-trailing-spaces */
import { Itrees } from "../../../type/type";



export default function DetailModal({setIsOpenDetail, article,isOpenDetail}:{ setIsOpenDetail :React.Dispatch<React.SetStateAction<boolean>>, article : Itrees, isOpenDetail:boolean}) {

  
  return (
    <>
      {/* Overlay pour fermer la modale en cliquant à l'extérieur */}
      {isOpenDetail && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setIsOpenDetail(false)}
        />
      )}

      {/* Modale */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-secondary w-80 p-6 rounded-lg shadow-lg text-white flex flex-col gap-4 z-20 mt-8" style={{ maxHeight: "80vh", overflowY: "auto" }}>

        {/* Bouton de fermeture */}
        <img
          onClick={() => setIsOpenDetail(false)}
          src="/images/icons/close.svg"
          alt="Fermer la modale"
          className="w-6 h-6 invert absolute top-4 right-4 cursor-pointer"
        />

        {/* Titre */}
        <h1 className="text-2xl font-bold text-center">Détail de l'arbre : </h1>
        <h2 className="text-xl font-bold text-center">{article.name} </h2>

        {/* Formulaire */}
        <div className="flex flex-col gap-4">

          {/* Catégorie */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-1">Categorie : {article.categories} </h3>
          </div>

    
          {/* Image URL */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-1">Image :</h3>
            <img className="h-56" src={article.Picture ? `/images/arbres/${article.Picture.url}.webp` : "/images/default.jpg"}
              alt={article.name}/>
          </div>

          {/* Prix */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-1">Prix : {article.price} €</h3>
          
          </div>

          {/* Description */}
          <div className="flex flex-col ">
            <h3 className="font-semibold mb-1">Description :</h3>
            <p> {article.description}</p>

          </div>
        </div>
      </div>

    </>
  );
}