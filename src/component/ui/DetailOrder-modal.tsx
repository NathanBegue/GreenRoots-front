import { Link, useNavigate } from "react-router";
import { Iorder, Itrees } from "../../../type/type";
import useCartStore from "../../Auth/cartStore";

interface DetailModalOrderProps {
    setIsOpenOrderDetail: React.Dispatch<React.SetStateAction<boolean>>;
    article: Itrees;
    isOpenedOrderModal: boolean;
    isDarkMode: boolean;
    orders: Iorder;
}

export default function DetailOrderModal({
    setIsOpenOrderDetail,
    article,
    isOpenedOrderModal,
    isDarkMode,
    orders,
}: DetailModalOrderProps) {

    const navigate = useNavigate();

    const addToCart = useCartStore((state) => state.addToCart);

    const id = orders.id



    if (!orders) {
        return (
            <div className="text-center">
                <p>Aucune commande disponible.</p>
            </div>
        );
    }


    return (
        <>
            {/* Overlay pour fermer la modale en cliquant à l'extérieur */}

            {isOpenedOrderModal && (
                <div
                    className="fixed inset-0 bg-black/50 z-10"
                    onClick={() => setIsOpenOrderDetail(false)}
                />
            )}

            {/* Modale */}
            <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? " bg-dark-secondary" : "bg-light-accent"} w-80 p-6 rounded-lg shadow-lg text-white flex flex-col gap-4 z-20 mt-8 md:w-md lg:w-lg`} style={{ maxHeight: "80vh", overflowY: "auto" }}>

                {/* Bouton de fermeture */}
                <img
                    onClick={() => setIsOpenOrderDetail(false)}
                    src="/images/icons/close.svg"
                    alt="Fermer la modale"
                    className={`w-6 h-6 ${isDarkMode && "invert"} absolute top-4 right-4 cursor-pointer `}
                />

                {/* Titre */}
                <h1 className={`text-2xl font-bold text-center ${isDarkMode ? " text-white" : "text-black"} `}>Détail de la commande </h1>
                <h2 className={`text-xl font-bold text-center font-title ${isDarkMode ? "text-white" : "text-black"} `}>{orders.article_summary} </h2>

                <div className="flex flex-col gap-4">
                    {/* Image URL */}
                    <div className="flex flex-col ">
                        {/* <img className="h-56 md:h-100" src={article.Picture ? article.Picture.url : "/images/default.jpg"} */}
                        {/*   alt={"test"}  /> */}
                    </div>
                    {/* Catégorie */}
                    {/*        <div className={`flex flex-col ${isDarkMode ? "text-white" : "text-black"} `}>
                        <h3 className="font-semibold mb-1 font-title">Catégories :</h3>
                        <ul className="list-disc pl-4 font-content">
                            {article.categories.map((category, index) => (
                                <li key={index}>{category.name}</li>
                            ))}
                        </ul>
                    </div> */}


                    {/* Description */}
                    <div className={`flex flex-col mb-4 ${isDarkMode ? "text-white" : "text-black"} `}>
                        <h3 className="font-semibold mb-1 font-title">Description :</h3>
                        <p className="font-content"> {orders.id} </p>

                        {/* Prix */}
                        <div className="flex flex-col mt-4">
                            <h3 className="font-semibold mb-1 font-content">Prix : {orders.total_price}  €</h3>
                        </div>

                    </div>
                    {/*   <div className="flex justify-center">
                        <button onClick={() => addToCart(article)} className={`bg-cta p-2 font-content text-sm rounded-sm ${isDarkMode ? "text-white" : "text-black"} `}> Ajouter au panier </button>
                    </div> */}

                    <div className="flex justify-center">
                        <button className={`bg-cta p-2 font-content text-sm rounded-sm ${isDarkMode ? "text-white" : "text-black"} `} onClick={() => navigate("/suivis")}> Suivie de l'arbre </button>
                    </div>
                </div>
            </div>

        </>
    );
}