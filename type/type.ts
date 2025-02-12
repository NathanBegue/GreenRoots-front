export interface Itrees {
    id: number;
    name: string;
    description: string;
    price: number;
    available: boolean;
    picture_id: number;
    Picture?: Ipicture;
}

export interface Ipicture {
    id: number;
    url: string;
}

export interface Iorder {
    id: number;
    article_summary: string;
    date: string;
    price: number;
}

export interface IAuthState {
    token: string | null;
    isAdmin: boolean | string;
    login: (token: string, isAdmin: boolean) => void;
    logout: () => void;
}