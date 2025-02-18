import { Itrees } from "../../type/type";

const mainFetch = {
    // fetch page d'accueil
    getArticlesIndex: async (): Promise<Itrees[]> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/`);
            const data = await response.json();

            console.log("Données reçues :", data);

            if (data.articles) {
                const mergedArticles = data.articles.map((article: Itrees) => ({
                    ...article,
                    Picture:
                        article.Picture || {
                            url: "/images/default.jpg",
                            description: "Image par défaut",
                        },
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

    // fetch boutique
    getArticleShop: async (): Promise<Itrees[]> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/boutique`);
            const data = await response.json();
            console.log("Données reçues :", data);

            if (data.articles) {
                const mergedArticles = data.articles.map((article: Itrees) => ({
                    ...article,
                    Picture:
                        article.Picture || {
                            url: "/images/default.jpg",
                            description: "Image par défaut",
                        },
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

    // fetch détail d'un article boutique
    getOneArticleshop: async (id: string): Promise<Itrees> => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/boutique/${id}`
            );
            const data = await response.json();
            console.log("Données reçues :", data);

            if (data.article) {
                const mergedArticle = {
                    ...data.article,
                    Picture:
                        data.article.Picture || {
                            url: "/images/default.jpg",
                            description: "Image par défaut",
                        },
                };

                return mergedArticle;
            } else {
                console.error("Format inattendu de l'API", data);
                return {} as Itrees;
            }
        } catch (error) {
            console.error("Erreur lors du fetch des articles:", error);
            return {} as Itrees;
        }
    },

    // fetch CGU
    getCgu: async (): Promise<string> => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/conditions-generales-d-utilisation`
            );
            const data = await response.json();
            console.log("Données reçues :", data);

            if (data.cgu) {
                return data.cgu;
            } else {
                console.error("Format inattendu de l'API", data);
                return "";
            }
        } catch (error) {
            console.error("Erreur lors du fetch des CGU:", error);
            return "";
        }
    },

    // fetch CGV
    getCGV: async (): Promise<string> => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/conditions-generales-de-vente`
            );
            const data = await response.json();
            console.log("Données reçues :", data);

            if (data.cgv) {
                return data.cgv;
            } else {
                console.error("Format inattendu de l'API", data);
                return "";
            }
        } catch (error) {
            console.error("Erreur lors du fetch des CGV:", error);
            return "";
        }
    },

    // fetch mentions légales
    getLegalMentions: async (): Promise<string> => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/mentions-legales`
            );
            const data = await response.json();
            console.log("Données reçues :", data);

            if (data.legalMentions) {
                return data.legalMentions;
            } else {
                console.error("Format inattendu de l'API", data);
                return "";
            }
        } catch (error) {
            console.error("Erreur lors du fetch des mentions légales:", error);
            return "";
        }
    },
};

export default mainFetch;
