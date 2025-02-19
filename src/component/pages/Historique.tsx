import { useEffect, useState } from "react"
import { Iorder } from "../../../type/type";
import fetchmethod from "../../fetch/method-fetch";

export default function Historique({ isDarkMode }: { isDarkMode: boolean }) {
    const [orders, setOrders] = useState<Iorder[]>([]);

    useEffect(() => {
        fetchmethod.getHistoryByUser().then((data: Iorder[]) => setOrders(data));
    }, []);

    return (

        <div className="pt-20" >
            <h3 className="text-xl font-bold text-center mb-4">🛒 Mes dernières commandes</h3>
            {
                orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className={`${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} p-4 rounded-lg shadow-lg mb-6`}>
                            <p className={`text-lg font-semibold ${isDarkMode ? "text-cta" : "text-black"} `}>
                                Commande du {order.date}
                            </p>

                            {/* Total de la commande */}
                            <div className="flex justify-between items-center mt-6 border-t border-gray-600 pt-4">
                                <p className="text-lg font-semibold">Total :</p>
                                <p className={`text-xl font-bold ${isDarkMode ? "text-cta" : "text-black"} `}>{order.total_price} €</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Aucune commande à afficher.</p>
                )
            }
        </div >
    )
};