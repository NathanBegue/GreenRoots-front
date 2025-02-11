import { Itrees, Ipicture } from "../../type/type";

const fetchmethod = {
    getArticles: async (): Promise<Itrees[]> => {
        try {
            const response = await fetch("http://localhost:5000/boutique");
            const data: { articles: Itrees[]; pictures: Ipicture[] } = await response.json();

            // Vérifie si data contient les articles et images
            if (data.articles && data.pictures) {
                const mergedArticles: Itrees[] = data.articles.map((article) => ({
                    ...article,
                    picture: data.pictures.find((p) => p.id === article.picture_id) || null,
                }));

                return mergedArticles; // On retourne les données fusionnées
            } else {
                console.error("Format inattendu de l'API", data);
                return [];
            }
        } catch (error) {
            console.error("Erreur lors du fetch des articles:", error);
            return [];
        }
    },

    getNewArticle: async (): Promise<Itrees[]> => {
        try {
            const response = await fetch("http://localhost:5000/");
            const data: { articles: Itrees[]; pictures: Ipicture[] } = await response.json();
            console.log("Données reçues:", data);

            // Vérifie si data contient les articles et images
            if (data.articles && data.pictures) {
                const mergedArticles: Itrees[] = data.articles.map((article) => ({
                    ...article,
                    picture: data.pictures.find((p) => p.id === article.picture_id) || null,
                }));

                return mergedArticles; // On retourne les données fusionnées
            } else {
                console.error("Format inattendu de l'API", data);
                return [];
            }
        } catch (error) {
            console.error("Erreur lors du fetch des articles:", error);
            return [];
        }
    },

    getArticleByOrder: async () => {
        try {
            const response = await fetch("http://localhost:5000/commande");
            const data = await response.json();
            console.log("Données reçues:", data);

        } catch (error) {
            console.error("Erreur lors de la récupération de l'historique des commandes:", error);
        }
    }

};

export default fetchmethod;
