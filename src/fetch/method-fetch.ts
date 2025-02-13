import { Itrees, } from "../../type/type";

const fetchmethod = {
  getArticles: async (): Promise<Itrees[]> => {
    try {
      const token = localStorage.getItem("token"); // Récupération du token

      const response = await fetch("http://localhost:5000/api/articles", {
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


  getNewArticle: async (): Promise<Itrees[]> => {
    try {
      const response = await fetch("http://localhost:5000/");
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
