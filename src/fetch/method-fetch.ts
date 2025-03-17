import { Itrees, Iorder, IUserInfos, ITracking, IOrderDetail } from "../../type/type";
import { apiKey, baseUrl, host } from "./Variables";

const cache = new Map();
const CACHE_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes

const fetchWithCache = async (url: string, options = {}) => {
    const cacheEntry = cache.get(url);

    if (cacheEntry && (Date.now() - cacheEntry.timestamp < CACHE_EXPIRATION_TIME)) {
        return cacheEntry.data;
    }

    const response = await fetch(url, options);
    const data = await response.json();

    cache.set(url, { data, timestamp: Date.now() });
    return data;
};

const fetchmethod = {

    // Fetch des articles de l'utilisateur avec cache
    getArticlesByAdmin: async (): Promise<Itrees[]> => {
        try {
            const url = `${baseUrl}/api/articles`;
            const token = localStorage.getItem("token"); // Récupération du token
            const data = await fetchWithCache(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // 🔥 Ajout du token JWT
                    "x-api-key": apiKey,
                },
            });

            if (data.articles) {
                const mergedArticles = data.articles.map((article: Itrees) => ({
                    ...article,
                    Picture: article.Picture && article.Picture.url ? {
                        ...article.Picture,
                        url: article.Picture.url.replace(`${host}`, `${baseUrl}`)
                    } : undefined,
                    categories: article.categories || { name: "Catégorie par défaut" },
                }));
                return mergedArticles;
            } else {
                console.error("Format inattendu de l'API", data);
                return [];
            }

        } catch (error) {
            console.error("Erreur lors du fetch des articles:", error);
            return [];
        }
    },

    // Fetch des derniers articles avec cache
    getNewArticle: async (): Promise<Itrees[]> => {
        try {
            const url = `${baseUrl}`;
            const data = await fetchWithCache(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey
                },
            });

            if (data.articles) {
                const mergedArticles = data.articles.map((article: Itrees) => ({
                    ...article,
                    Picture: article.Picture && article.Picture.url ? {
                        ...article.Picture,
                        url: article.Picture.url.replace(`${host}`, `${baseUrl}`)
                    } : undefined,
                    categories: article.categories || { name: "Catégorie par défaut" },
                }));
                return mergedArticles;
            } else {
                console.error("Format inattendu de l'API", data);
                return [];
            }

        } catch (error) {
            console.error("Erreur lors du fetch des articles:", error);
            return [];
        }
    },

    // Fetch de tous les articles avec cache
    getArticle: async (): Promise<Itrees[]> => {
        try {
            const url = `${baseUrl}/boutique`;
            const data = await fetchWithCache(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey,
                },
            });

            if (data.articles) {
                const mergedArticles = data.articles.map((article: Itrees) => ({
                    ...article,
                    Picture: article.Picture && article.Picture.url ? {
                        ...article.Picture,
                        url: article.Picture.url.replace(`${host}`, `${baseUrl}`)
                    } : undefined,
                    categories: article.categories || { name: "Catégorie par défaut" },
                }));
                return mergedArticles;
            } else {
                console.error("Format inattendu de l'API", data);
                return [];
            }
        } catch (error) {
            console.error("Erreur lors du fetch des articles:", error);
            return [];
        }
    },

    // Fetch commandes utilisateur avec cache
    getHistoryByUser: async (): Promise<Iorder[]> => {
        try {
            const url = `${baseUrl}/compte/commandes`;
            const token = localStorage.getItem("token");
            const data = await fetchWithCache(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "x-api-key": apiKey,
                },
            });

            return data;
        } catch (error) {
            console.error("Erreur lors du fetch des commandes :", error);
            return [];
        }
    },

    // Fetch infos utilisateur avec cache
    getUserInfos: async (): Promise<IUserInfos> => {
        try {
            const url = `${baseUrl}/compte`;
            const token = localStorage.getItem("token");
            const data = await fetchWithCache(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "x-api-key": apiKey,
                },
            });

            return data;
        } catch (error) {
            console.error("Erreur lors du fetch des infos utilisateur :", error);
            // Retourne un objet par défaut respectant IUserInfos
            return {
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                // eslint-disable-next-line camelcase
                repeat_password: "",
            };
        }
    },

    // Fetch de toutes les commandes (admin) avec cache
    getAllOrders: async (): Promise<Iorder[]> => {
        try {
            const url = `${baseUrl}/api/commandes`;
            const token = localStorage.getItem("token");
            const data = await fetchWithCache(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "x-api-key": apiKey,
                },
            });

            return data;
        } catch (error) {
            console.error("Erreur lors du fetch des commandes :", error);
            return [];
        }
    },

    // Fetch du détail de la commande d'un utilisateur avec cache
    getOrderDetailAdmin: async (id: number): Promise<IOrderDetail> => {
        try {
            const url = `${baseUrl}/api/commandes/${id}`;
            const token = localStorage.getItem("token");
            const data = await fetchWithCache(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "x-api-key": apiKey,
                },
            });

            if (!data) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }

            return data as IOrderDetail;
        } catch (error) {
            console.error("Erreur lors du fetch des commandes :", error);
            throw error;
        }
    },

    // Fetch du suivi d'un article d'une commande (admin) avec cache
    getTrackingByIdAdmin: async (orderId: number, trackingId: number): Promise<ITracking[]> => {
        try {
            const url = `${baseUrl}/api/commandes/${orderId}/suivi/${trackingId}`;
            const token = localStorage.getItem("token");
            const data = await fetchWithCache(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "x-api-key": apiKey,
                },
            });

            return data;
        } catch (error) {
            console.error("Erreur lors du fetch du tracking :", error);
            return [];
        }
    },

    // Fetch du suivi d'un article d'une commande (utilisateur) avec cache
    getTrackingByIdUser: async (orderId: number, trackingId: number): Promise<ITracking[]> => {
        try {
            const url = `${baseUrl}/compte/commandes/${orderId}/suivi/${trackingId}`;
            const token = localStorage.getItem("token");
            const data = await fetchWithCache(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "x-api-key": apiKey,
                },
            });

            return data;
        } catch (error) {
            console.error("Erreur lors du fetch du tracking :", error);
            return [];
        }
    },

    // Fetch du détail d'une commande d'un utilisateur avec cache
    getOrderDetailUser: async (id: number): Promise<IOrderDetail> => {
        try {
            const url = `${baseUrl}/compte/commandes/${id}`;
            const token = localStorage.getItem("token");
            const data = await fetchWithCache(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    "x-api-key": apiKey,
                },
            });

            if (!data) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }

            return data as IOrderDetail;
        } catch (error) {
            console.error("Erreur lors du fetch des commandes :", error);
            throw error;
        }
    },
};

export default fetchmethod;