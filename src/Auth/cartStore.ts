import { create } from "zustand";
import { Ipicture } from "../../type/type";

// Définition du type d'un produit
interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    Picture: Ipicture;
}

// Définition du type du store Zustand
interface CartState {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    clearCart: () => void;
}

// Fonction pour charger les données du localStorage
const loadCartFromStorage = (): Product[] => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

// Création du store Zustand
const useCartStore = create<CartState>((set) => ({
    cart: loadCartFromStorage(), // Charger depuis localStorage au démarrage

    addToCart: (product: Product) =>
        set((state) => {
            const existingItem = state.cart.find((item) => item.id === product.id);
            let updatedCart;

            if (existingItem) {
                updatedCart = state.cart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedCart = [
                    ...state.cart,
                    {
                        ...product,
                        quantity: 1,
                        // 🔥 Correction : Récupération correcte de l’image
                        image: product.Picture?.url
                            ? `/images/arbres/${product.Picture.url}.webp`
                            : "/images/default.png",
                    },
                ];
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return { cart: updatedCart };
        }),




    removeFromCart: (productId: string) =>
        set((state) => {
            const updatedCart = state.cart.filter((item) => item.id !== productId);
            localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sauvegarde
            return { cart: updatedCart };
        }),

    updateQuantity: (productId: string, newQuantity: number) =>
        set((state) => {
            const updatedCart = state.cart.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sauvegarde
            return { cart: updatedCart };
        }),

    clearCart: () =>
        set(() => {
            localStorage.removeItem("cart"); // Supprime du stockage
            return { cart: [] };
        }),
}));

export default useCartStore;
