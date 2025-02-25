import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Product } from "../../../type/type";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

export default function FakePayment({ isDarkMode }: { isDarkMode: boolean }) {
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [cardNumber, setCardNumber] = useState("");

    const inputRef = useRef(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }

    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const cart = JSON.parse(localStorage.getItem("cart") || "[]") as Product[];


        if (cart.length === 0) {
            showErrorToast("Votre panier est vide.");
            return;
        }

        setIsProcessing(true);

        try {
            const orderData = {
                articles: cart.map((item: Product) => ({
                    id: item.id,
                    quantity: item.quantity,
                })),
            };

            console.log("📦 Données envoyées :", JSON.stringify(orderData, null, 2));

            const response = await fetch("http://localhost:3000/commande", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}`);
            }

            const data = await response.json();
            console.log("✅ Commande créée :", data);

            localStorage.removeItem("cart");
            setPaymentSuccess(true);
            showSuccessToast("Merci pour votre achat !");

            setTimeout(() => {
                navigate("/");
                window.location.reload();
            }, 2000);
        } catch (error) {
            showErrorToast("Erreur lors du paiement. Veuillez réessayer.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-primary p-6">
            <div className="bg-dark-secondary p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Paiement sécurisé</h2>

                {paymentSuccess ? (
                    <div className="text-green-600 text-center">
                        🎉 Paiement réussi ! Redirection en cours...
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label className="text-white">Numéro de carte</label>
                            <input
                                ref={inputRef}
                                type="text"
                                className="border p-3 rounded-lg bg-dark-primary text-white"
                                placeholder="4242 4242 4242 4242"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="bg-cta text-white px-4 py-2 rounded-lg hover:bg-opacity-90 disabled:bg-gray-400"
                        >
                            {isProcessing ? "Paiement en cours..." : "Payer"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
