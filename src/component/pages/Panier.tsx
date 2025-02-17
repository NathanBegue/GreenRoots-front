import { Link } from "react-router";
import useCartStore from "../../Auth/cartStore";

export default function Panier() {
    const { cart, removeFromCart, updateQuantity } = useCartStore();

    return (
        <div className="bg-dark-primary text-white px-4 py-10 w-full min-h-screen flex flex-col gap-6 pt-20 lg:pt-32">
            <h1 className="text-center text-xl font-bold">Votre panier</h1>

            {/* Articles du panier */}
            <div className="w-full flex flex-col gap-4">
                {cart.length === 0 ? (
                    <p className="text-center text-gray-400">Votre panier est vide.</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="bg-dark-accent p-4 flex flex-col items-center gap-4 shadow-lg w-full rounded-lg border sm:flex-row sm:justify-between">
                            {/* Image de l'article */}
                            <img className="size-20 object-cover rounded-lg" src={item.image} alt={item.name} />

                            {/* Nom et prix */}
                            <div className="text-center sm:text-left flex flex-col">
                                <p className="text-sm font-bold">{item.name}</p>
                                <p className="text-lg font-semibold">{item.price} €</p>
                            </div>

                            {/* Sélecteur de quantité */}
                            <div className="flex flex-row items-center gap-3">
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="size-8 flex items-center justify-center bg-dark-secondary border rounded-lg p-1">
                                    <img className="size-6 invert" src="/images/icons/chevron-up.svg" alt="Augmenter" />
                                </button>
                                <p className="w-8 text-center text-lg font-bold">{item.quantity}</p>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="size-8 flex items-center justify-center bg-dark-secondary border rounded-lg p-1">
                                    <img className="size-6 invert" src="/images/icons/chevron-down.svg" alt="Diminuer" />
                                </button>
                            </div>

                            {/* Prix total */}
                            <p className="text-lg font-semibold">{item.price * item.quantity} €</p>

                            {/* Bouton de suppression */}
                            <button onClick={() => removeFromCart(item.id)} className="size-8 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-lg p-1">
                                <img className="size-6 invert" src="/images/icons/trash.svg" alt="Supprimer" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Section Total & Paiement */}
            <div className="bg-dark-accent p-6 flex flex-col gap-6 shadow-lg w-full rounded-lg border">
                <div className="flex justify-between text-lg font-semibold">
                    <h2>Total</h2>
                    <p>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} €</p>
                </div>

                <form action="" className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <input type="checkbox" id="cgv" className="size-5" />
                        <label htmlFor="cgv" className="text-sm">J'accepte les conditions générales de vente</label>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <Link to="/cgu" className="underline text-sm text-gray-300 hover:text-white">Voir les CGU</Link>
                        <button className="bg-cta w-full text-lg px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition">Payer</button>
                    </div>
                </form>
            </div>

            <Link to="/boutique" className="text-center p-4 bg-cta rounded-lg font-semibold text-lg hover:bg-opacity-90 transition">Retour à la boutique</Link>
        </div>
    );
}