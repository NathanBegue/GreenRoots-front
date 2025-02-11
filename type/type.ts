export interface Itrees {
    id: number;
    name: string;
    description: string;
    price: number;
    available: boolean;
    picture_id: number;
    picture: Ipicture;
}

export interface Ipicture {
    id: number;
    url: string;
    description: string;
}