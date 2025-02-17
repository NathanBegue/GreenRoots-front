import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX"); // Remplace par ta clé Stripe publique

export default function Paypage() {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
}

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setErrorMessage("");

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            setErrorMessage(error.message || "Erreur lors du paiement");
            setIsProcessing(false);
            return;
        }

        console.log("💳 Payment Method:", paymentMethod);

        // Simuler un paiement réussi (remplace avec ton appel API)
        setTimeout(() => {
            setPaymentSuccess(true);
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark-primary p-6 border shadow-lg">
            <div className="bg-dark-secondary p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Paiement sécurisé</h2>

                {paymentSuccess ? (
                    <div className="text-green-600 text-center">
                        🎉 Paiement réussi ! Merci pour votre achat.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="border border-white p-3 rounded-lg">
                            <CardElement options={{ hidePostalCode: true }} />
                        </div>

                        {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

                        <button
                            type="submit"
                            disabled={!stripe || isProcessing}
                            className="bg-cta text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {isProcessing ? "Paiement en cours..." : "Payer"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
