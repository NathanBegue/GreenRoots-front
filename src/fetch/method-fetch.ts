import { Itrees, Iorder, IUserInfos, Itracking } from "../../type/type";

const fetchmethod = {

  // fetch admin
  getArticlesByAdmin: async (): Promise<Itrees[]> => {
    try {
      const token = localStorage.getItem("token"); // Récupération du token

      const response = await fetch("http://localhost:3000/api/articles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 Ajout du toke
          // n JWT
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

  // fetch page d'accueil
  getNewArticle: async (): Promise<Itrees[]> => {
    try {
      const response = await fetch("http://localhost:3000/");
      const data = await response.json();

      console.log("Données reçues :", data);

      if (data.articles) {
        const mergedArticles = data.articles.map((article: Itrees) => ({
          ...article,
          Picture: article.Picture || { url: "/images/default.jpg", description: "Image par défaut" },

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
  getArticle: async (): Promise<Itrees[]> => {
    try {
      const response = await fetch("http://localhost:3000/boutique");
      const data = await response.json();
      console.log("Données reçues :", data);

      if (data.articles) {
        const mergedArticles = data.articles.map((article: Itrees) => ({
          ...article,
          Picture: article.Picture || {
            url: "/images/default.jpg",
            description: "Image par défaut",
          },
          // Si article.category n'existe pas, on lui attribue une valeur par défaut.
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

  // fetch commandes utilisateur
  getHistoryByUser: async (): Promise<Iorder[]> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/compte/commandes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Données reçues :", data);

      // Si data est un tableau, on le retourne directement,
      // sinon on tente de retourner data.orders ou un tableau vide
      return data
    } catch (error) {
      console.error("Erreur lors du fetch des commandes :", error);
      return [];
    }
  },

  // fetch infos utilisateur
  getUserInfos: async (): Promise<IUserInfos> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/compte", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Données reçues :", data);
      return data;
    } catch (error) {
      console.error("Erreur lors du fetch des infos utilisateur :", error);
      // Retourne un objet par défaut respectant IUserInfos
      return {
        firstname: "",
        lastname: "",
        email: "",
      };
    }
  },
  // fetch de toutes les commandes (admin)
  getAllOrders: async (): Promise<Iorder[]> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/commandes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Données reçues :", data);

      // Si data est un tableau, on le retourne directement,
      // sinon on tente de retourner data.orders ou un tableau vide
      return data
    } catch (error) {
      console.error("Erreur lors du fetch des commandes :", error);
      return [];
    }
  },

  // detail de la commande d'un utilisateur
  getOrderDetailAdmin: async (id: number): Promise<Itracking[]> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/commandes/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      const data = await response.json();
      console.log("Données reçues :", data);
      return data;
    }
    catch (error) {
      console.error("Erreur lors du fetch des commandes :", error);
      return [];
    }
  },

  getOrderDetailUser: async (id: number): Promise<Itracking[]> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/compte/commandes/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      const data = await response.json();
      console.log("Données reçues :", data);
      return data;
    }
    catch (error) {
      console.error("Erreur lors du fetch des commandes :", error);
      return [];
    }
  },


};

export default fetchmethod;
