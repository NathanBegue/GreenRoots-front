import { useEffect, useState } from "react"
import { Iorder, Itrees } from "../../../type/type";
import fetchmethod from "../../fetch/method-fetch";
import DetailOrderModal from "../ui/DetailOrder-modal";

export default function Historique({
    isDarkMode,
    article
}: { isDarkMode: boolean, article: Itrees }) {

    const [isOpenedOrderModal, setIsOpenedOrdertModal] = useState<boolean>(false);
    const [orders, setOrders] = useState<Iorder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Iorder | null>(null);

    useEffect(() => {
        fetchmethod.getHistoryByUser().then((data: Iorder[]) => setOrders(data));
    }, []);

    const openModal = (order: Iorder) => {
        setSelectedOrder(order);  // Sélectionner la commande
        localStorage.setItem('orderId', order.id.toString());  // Stocker l'ID de la commande dans le localStorage
        setIsOpenedOrdertModal(true);  // Ouvrir la modale
    };


    return (

        <div className="h-400">

            <>
                <h3 className="text-xl font-bold text-center mb-4 pt-40 ">🛒 Mes dernières commandes</h3>
                <div className="flex justify-center pt-10  max-w-5xl w-sm flex-col md:w-md lg:flex-row gap-10 mx-auto">

                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div key={order.id} className={`${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} w-full h-fit p-4 rounded-lg shadow-lg mb-6 `}>
                                <p className={`text-lg font-semibold ${isDarkMode ? "text-cta" : "text-black"}`}>
                                    Commande du {order.date}
                                </p>
                                <p>{order.article_summary}</p>
                                <div className="flex justify-between items-center mt-6 border-t border-gray-600 pt-4">
                                    <p className="text-lg font-semibold">Total :</p>
                                    <p className={`text-xl font-bold ${isDarkMode ? "text-cta" : "text-black"}`}>{order.total_price} €</p>
                                </div>
                                <div>
                                    <button
                                        className={`px-4 py-1 rounded-lg bg-dark-primary  cursor-pointer hover:scale-110 text-lg ${!isDarkMode && "bg-light-primary text-black"}`}
                                        onClick={() => openModal(order)} // Ouvre la modale avec la commande sélectionnée
                                    >
                                        Voir détail de la commande
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">Aucune commande à afficher.</p>
                    )}
                    {/* Afficher la modale avec les détails de la commande sélectionnée */}
                    {isOpenedOrderModal && selectedOrder && (
                        <DetailOrderModal
                            isDarkMode={isDarkMode}
                            setIsOpenOrderDetail={setIsOpenedOrdertModal}
                            article={article}
                            isOpenedOrderModal={isOpenedOrderModal}
                            orders={selectedOrder} // Passe la commande spécifique
                        />
                    )}
                </div></>
        </div>
    );
}
