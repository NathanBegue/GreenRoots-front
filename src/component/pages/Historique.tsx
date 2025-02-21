import { useEffect, useState } from "react";
import { Iorder, Itrees } from "../../../type/type";
import fetchmethod from "../../fetch/method-fetch";
import DetailOrderModal from "../ui/DetailOrder-modal";
import { useAuthStore } from "../../Auth/authStore";

export default function Historique({
    isDarkMode,
    article,
}: {
    isDarkMode: boolean,
    article: Itrees
}) {

    const [isOpenedOrderModal, setIsOpenedOrdertModal] = useState<boolean>(false);
    const [orders, setOrders] = useState<Iorder[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Iorder | null>(null);
    const { isAdmin } = useAuthStore();

    // Fonction pour formater la date en heure de Paris
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("fr-FR", {
            timeZone: "Europe/Paris",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
    };

    useEffect(() => {
        const fetchOrders = async () => {
            const data: Iorder[] = isAdmin
                ? await fetchmethod.getAllOrders()
                : await fetchmethod.getHistoryByUser();
            setOrders(data);
        };
        fetchOrders();
    }, [isAdmin]);

    const openModal = (order: Iorder) => {
        setSelectedOrder(order);
        localStorage.setItem("orderId", order.id.toString());
        setIsOpenedOrdertModal(true);
    };

    return (
        <div className={`h-full ml-4 mr-4 ${isDarkMode ? "bg-dark-primary" : "bg-light-primary"}`}>
            <h3 className="text-xl font-bold text-center margin-auto pt-25">
                🛒 Mes dernières commandes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto pt-15 pb-15 w-full">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            className={`h-full min-h-[300px] flex flex-col justify-between ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} w-full p-4 rounded-lg shadow-lg`}
                        >

                            <p className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                                Commande du {formatDate(order.date)}
                            </p>
                            <p className="text-xl m-4"> Commande N° {order.id}</p>
                            <p>{order.article_summary}</p>
                            <div className="flex justify-between items-center mt-6 border-t border-gray-600 pt-4">
                                <p className="text-lg font-semibold">Total :</p>
                                <p className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                                    {order.total_price} €
                                </p>
                            </div>
                            <div className="flex justify-center mt-auto">
                                <button
                                    className={` px-4 py-1 rounded-lg bg-dark-primary cursor-pointer hover:scale-110 text-lg mx-auto ${!isDarkMode && "bg-light-primary text-black"}`}
                                    onClick={() => openModal(order)}
                                >
                                    Voir détail de la commande
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center ">Aucune commande à afficher.</p>
                )}

                {isOpenedOrderModal && selectedOrder && (
                    <DetailOrderModal
                        isDarkMode={isDarkMode}
                        setIsOpenOrderDetail={setIsOpenedOrdertModal}
                        article={article}
                        isOpenedOrderModal={isOpenedOrderModal}
                        orders={selectedOrder}
                    />
                )}
            </div>
        </div>
    );
}
