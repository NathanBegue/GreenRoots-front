import { useState } from "react";
import { Itrees } from "../../../type/type";

export default function EditModal({

    setIsOpenedEditModal,
    isOpenedEditModal,
    article,
    setArticles,
    setSelectedArticle

}: {
    isOpenedEditModal: boolean,
    setIsOpenedEditModal: React.Dispatch<React.SetStateAction<boolean>>
    article: Itrees;
    setArticles: React.Dispatch<React.SetStateAction<Itrees[]>>;
    setSelectedArticle: React.Dispatch<React.SetStateAction<Itrees | null>>;
}) {

  const [formData, setFormData] = useState({
    category: "Conifères",
    name: article.name,
    image: article.Picture.url,
    price: article.price,
    description: article.description,
    available: true
  });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        try {
            const response = await fetch(`http://localhost:5000/api/articles/${article.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    price: Number(formData.price), // Conversion en nombre
                    categoryName: article.categories.map((cat) => cat.name), // 🔥 Extraire les noms des catégories
                    pictureUrl: formData.image, // URL de l'image
                    description: formData.description,
                    available: formData.available,
                }),
            });

            const updatedArticle = await response.json();
            console.log("✅ Article mis à jour avec succès :", updatedArticle);

            // 🔥 CRÉER UN NOUVEAU TABLEAU (important pour le hot reload)
            setArticles((prev) => {
                return prev.map((a) =>
                    a.id === article.id
                        ? {
                            ...a,
                            ...updatedArticle,
                            categories: updatedArticle.categories || a.categories,
                            Picture: updatedArticle.Picture
                                ? updatedArticle.Picture
                                : { url: formData.image, description: "Image mise à jour" }
                        }
                        : { ...a } // 🔥 IMPORTANT : On recrée un nouvel objet à chaque fois
                );
            });

            setSelectedArticle(updatedArticle);
            setIsOpenedEditModal(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'article :", error);
        }
    };


    return (
        <>
            {/* Overlay pour fermer la modale en cliquant à l'extérieur */}
            {isOpenedEditModal && (
                <div
                    className="fixed inset-0 bg-black/50 z-10"
                    onClick={() => setIsOpenedEditModal(false)}
                />
            )}

            {/* Modale */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-secondary w-80 p-6 rounded-lg shadow-lg text-white flex flex-col gap-4 z-20 mt-8">

                {/* Bouton de fermeture */}
                <img
                    onClick={() => setIsOpenedEditModal(false)}
                    src="/images/icons/close.svg"
                    alt="Fermer la modale"
                    className="w-6 h-6 invert absolute top-4 right-4 cursor-pointer"
                />

                {/* Titre */}
                <h2 className="text-xl font-bold text-center">Modifier : {article.name}</h2>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Catégorie */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Catégorie</label>
                        <select className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                            defaultValue={formData.category}
                            /*    multiple={true} */
                            onChange={handleChange}
                            name="category">
                            <option value="">Choisir une catégorie</option>
                            <option value="fruitier">Arbres fruitiers</option>
                            <option value="ornement">Arbres d'ornement</option>
                            <option value="forestier">Arbres forestiers</option>
                            <option value="conifere">Conifères</option>
                            <option value="croissance">Arbres à croissance rapide</option>
                            <option value="medicinal">Arbres médicinaux</option>
                        </select>
                    </div>

                    {/* Nom */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Nom de l'article</label>
                        <input
                            type="text"
                            placeholder="Ex: Chêne pédonculé"
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                            onChange={handleChange}
                            value={formData.name}
                            name="name"
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Image (URL)</label>
                        <input
                            type="text"
                            placeholder="https://exemple.com/image.jpg"
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                            onChange={handleChange}
                            value={formData.image}
                            name="image"
                            required
                        />
                    </div>

                    {/* Prix */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Prix (€)</label>
                        <input
                            type="number"
                            placeholder="Ex: 110"
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                            onChange={handleChange}
                            value={formData.price}
                            name="price"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Description</label>
                        <textarea
                            placeholder="Ajoutez une brève description..."
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta resize-none"
                            onChange={handleChange}
                            value={formData.description}
                            name="description"
                            rows={3}
                            required
                        />
                    </div>

                    {/* Boutons */}
                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
                            onClick={() => setIsOpenedEditModal(false)}
                        >

                            Annuler
            </button>
            <button
              type="submit"
              className="bg-cta px-4 py-2 rounded-lg text-white hover:bg-cta-dark transition"
            >
                            Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
