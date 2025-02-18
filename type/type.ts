export interface Itrees {
    id: number;
    name: string;
    description: string;
    price: number;
    available: boolean;
    picture_id: number;
    Picture?: Ipicture;
    categories: Icategory[];
}

export interface Ipicture {
    id: number;
    url: string;
}

export interface Icategory {
    id: number;
    name: string;
}

export interface Iorder {
    id: number;
    article_summary: string;
    date: string;
    total_price: number;
}

export interface IAuthState {
    token: string | null;
    isAdmin: boolean | string;
    login: (token: string, isAdmin: boolean) => void;
    logout: () => void;
}

export interface IUserInfos {
    firstname: string;
    lastname: string;
    age: number;
    email: string;
}

// Définition du type d'un produit
export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    Picture: Ipicture;
}

// Définition du type du store Zustand
export interface CartState {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    clearCart: () => void;
}