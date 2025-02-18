import { Itrees } from "../../type/type";
const adminFetch = {

    getArticlesByAdmin: async (): Promise<Itrees[]> => {
        try {
            const token = localStorage.getItem("token"); // Récupération du token

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/articles`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // 🔥 Ajout du token JWT
                },
            });

            if (!response.ok) {
                throw new Error(`Erreur API : ${response.status} - ${await response.text()}`);
            }

            const data = await response.json();
            console.log("Données reçues :", data);

            if (data.articles) {
                const mergedArticles = data.articles.map((article: Itrees) => ({
                    ...article,
                    Picture: article.Picture || { url: "/images/default.jpg", description: "Image par défaut" }
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

    getOneArticleByAdmin: async (id: string): Promise<Itrees> => {
        try {
            const token = localStorage.getItem("token"); // Récupération du token

            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/articles/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // 🔥 Ajout du token JWT
                },
            });

            if (!response.ok) {
                throw new Error(`Erreur API : ${response.status} - ${await response.text()}`);
            }

            const data = await response.json();
            console.log("Données reçues :", data);

            return data;

        } catch (error) {
            console.error("Erreur lors du fetch des articles:", error);
            throw error;
        }
    },

    createArticleByAdmin: async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/articles`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();
            console.log("📡 Réponse API :", JSON.stringify(data, null, 2));

            if (!response.ok) {
                console.error("❌ Erreur API :", data);
                return;
            }

            setArticles((prevArticles) => [...prevArticles, data.article]);
            setOpenCreateModal(false);
        } catch (error) {
            console.error("❌ Erreur lors de l'ajout de l'article :", error);
        }
    },

    modiFyArticleByAdmin: async () => {
        try {
            // Récupération du token et création des headers
            const token = localStorage.getItem("token");
            const headers: HeadersInit = {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            };

            // Utilisation d'une URL relative
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/articles/${article.id}`, {
                method: "PATCH",
                headers,
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);
            }

            const updatedArticle = await response.json();
            console.log("✅ Article mis à jour avec succès :", updatedArticle);

            // Mise à jour de la liste des articles
            setArticles((prev) =>
                prev.map((a) =>
                    a.id === article.id
                        ? {
                            ...a,
                            ...updatedArticle,
                            categories: updatedArticle.categories || a.categories,
                            Picture: updatedArticle.Picture
                                ? updatedArticle.Picture
                                : { url: pictureUrl, description: "Image mise à jour" },
                        }
                        : a
                )
            );

            setSelectedArticle(updatedArticle);
            setIsOpenedEditModal(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'article :", error);
        }
    },

    deleteArticleByAdmin: async (id: string) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/articles/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },

            });

            const data = await response.json();
            console.log("Article supprimé avec succès :", data);
            setArticles((prev) => prev.filter((a) => a.id !== article.id));


        } catch (error) {
            console.error("Erreur lors de la suppression de l'article :", error)
        }
    },

}


export default adminFetch;