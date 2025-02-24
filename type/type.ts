export interface Itrees {
    id: number;
    name: string;
    description: string;
    price: number;
    available: boolean;
    picture_id: number;
    Picture?: Ipicture;
    categories: Icategory[];
    stripe_product_id: string;
    stripe_price_id: string;
    created_at: string;
    updated_at: string;
    ArticleHasOrder: ArticleHasOrder;
    ArticleTrackings: IArticleTracking[];
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
    total_price: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    User: User;
    ArticleTrackings: ITracking[];
    articles: Itrees[];
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
    email: string;
    password: string;
    repeat_password: string;
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

//Définition du type d'un suivis d'article d'une commande 
export interface IArticleTracking {
    id: number;
    growth: string;
    status: string;
    plant_place: string;
    nickname: string | null;
    article_id: number;
    article_has_order_id: number;
    picture_id: number;
    created_at: string;
    updated_at: string;
    Picture: Ipicture;
}



export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

export interface ArticleHasOrder {
    quantity: number;
}

export interface IArticleDetail {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    picture_id: number;
    stripe_product_id: string;
    stripe_price_id: string;
    ArticleHasOrder: ArticleHasOrder;
}

export interface IOrderDetail {
    id: number;
    article_summary: string;
    date: string;
    total_price: string;
    user_id: number;
    User: User;
    articles: IArticleDetail[];
}

export interface ITracking {
    id: number;
    status: string;
    order_id: number;
    created_at: string;
    updated_at: string;

    // ✅ Ajout des propriétés attendues
    name?: string; // Nom de l'article ou commande
    ArticleHasOrder?: ArticleHasOrder; // Association à la commande
    ArticleTrackings?: IArticleTracking[]; // Liste des suivis
    Picture?: Ipicture; // Image liée
}


