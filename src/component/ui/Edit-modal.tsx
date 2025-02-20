import { useState } from "react";
import { Itrees } from "../../../type/type";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

export default function EditModal({
    setIsOpenedEditModal,
    isOpenedEditModal,
    article,
    setArticles,
    setSelectedArticle,
    isDarkMode,
    articles,
}: {
    isOpenedEditModal: boolean;
    setIsOpenedEditModal: React.Dispatch<React.SetStateAction<boolean>>;
    article: Itrees;
    setArticles: React.Dispatch<React.SetStateAction<Itrees[]>>;
    setSelectedArticle: React.Dispatch<React.SetStateAction<Itrees | null>>;
    isDarkMode: boolean;
    articles: Itrees[];
}) {
    // Définition du type pour le formulaire
    interface FormDataState {
        category: string;
        name: string;
        image: File | string;
        price: number | string;
        description: string;
        available: boolean;
        picture_id?: number;
    }

    // Initialisation de l'état du formulaire à partir des données de l'article
    const [formData, setFormData] = useState<FormDataState>({
        category: article.categories?.[0]?.name || "Conifères",
        name: article.name,
        image: article.Picture?.url || "",
        price: article.price,
        description: article.description,
        available: true,
    });

    // Gestion des modifications des champs du formulaire
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        if (e.target.type === "file") {
            const file = (e.target as HTMLInputElement).files?.[0] || "";
            setFormData((prev) => ({ ...prev, image: file }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
    };



    /**
     * Convertit un fichier en chaîne Base64.
     * @param file Le fichier à convertir.
     * @returns Une promesse qui résout avec la chaîne Base64.
     */
    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Si une nouvelle image est sélectionnée et qu'elle est de type File, la convertir en base64
        let base64Image = "";
        if (formData.image instanceof File) {
            try {
                base64Image = await convertToBase64(formData.image);
                base64Image = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");
            } catch (error) {
                showErrorToast("Erreur lors de la conversion de l'image");
                return;
            }
        }

        // Construction du payload de base pour la mise à jour de l'article
        const payload: any = {
            name: formData.name.trim() !== "" ? formData.name.trim() : article.name,
            price: formData.price !== "" ? Number(formData.price) : article.price,
            categoryName: [
                formData.category.trim() !== ""
                    ? formData.category.trim()
                    : article.categories?.[0]?.name,
            ],
            description:
                formData.description.trim() !== ""
                    ? formData.description.trim()
                    : article.description,
            available: formData.available,
        };

        // Si une nouvelle image est fournie et c'est un fichier, ajouter les informations pour la mise à jour de l'image
        if (formData.image instanceof File) {
            payload.imageId = article.Picture?.id;
            payload.pictureUrl = base64Image;
        } else {
            // Sinon, on envoie l'URL existante si disponible
            payload.pictureUrl =
                typeof formData.image === "string" && formData.image.trim() !== ""
                    ? formData.image.trim()
                    : article.Picture?.url;
        }

        // Affichage du payload dans la console pour débogage
        console.log("Payload envoyé :", JSON.stringify(payload, null, 2));

        try {
            const token = localStorage.getItem("token");
            const headers: HeadersInit = {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            };

            const response = await fetch(`http://localhost:3000/api/articles/${article.id}`, {
                method: "PATCH",
                headers,
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Erreur ${response.status}: ${response.statusText}`);

            }

            const updatedArticle = await response.json();
            console.log("Article mis à jour :", updatedArticle);

            // Met à jour la liste des articles dans l'état en remplaçant l'article modifié
            setArticles((prev) =>
                // Parcourt tous les articles précédents
                prev.map((a) =>
                    // Si l'article correspond à celui qui a été mis à jour (vérification par l'ID)
                    a.id === article.id
                        ? {
                            // Conserve toutes les propriétés existantes de l'article
                            ...a,
                            // Remplace ou ajoute les propriétés retournées par le serveur lors de la mise à jour
                            ...updatedArticle,
                            // Pour la propriété "categories" : si updatedArticle.categories existe, on l'utilise ;
                            // sinon, on conserve les catégories déjà présentes dans l'article précédent
                            categories: updatedArticle.categories || a.categories,
                            // Pour la propriété "Picture" :
                            // - Si updatedArticle.Picture est défini, on l'utilise.
                            // - Sinon, on crée un objet Picture avec :
                            //    - url : on utilise la valeur de payload.pictureUrl si disponible, sinon celle existante (a.Picture?.url)
                            //    - description : on indique "Image mise à jour" pour signaler que l'image a été modifiée
                            Picture: updatedArticle.Picture
                                ? updatedArticle.Picture
                                : { url: payload.pictureUrl || a.Picture?.url, description: "Image mise à jour" },
                        }
                        : a // Pour tous les autres articles, on ne change rien
                )
            );
            setSelectedArticle(updatedArticle);
            setIsOpenedEditModal(false);
            showSuccessToast("Article mis à jour avec succès !");

        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'article :", error);
            showErrorToast("Erreur lors de la mise à jour de l'article");
        }
    };


    return (
        <>
            {/* Overlay pour fermer la modale */}
            {isOpenedEditModal && (
                <div className="fixed inset-0 bg-black/50 z-10" onClick={() => setIsOpenedEditModal(false)} />
            )}

            {/* Modale */}
            <div
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"
                    } w-80 p-6 rounded-lg shadow-lg flex flex-col gap-4 z-20 mt-8`}
            >
                {/* Bouton de fermeture */}
                <img
                    onClick={() => setIsOpenedEditModal(false)}
                    src="/images/icons/close.svg"
                    alt="Fermer la modale"
                    className={`w-6 h-6 ${isDarkMode && "invert"} absolute top-4 right-4 cursor-pointer`}
                />

                {/* Titre */}
                <h2 className="text-xl font-bold text-center">Modifier : {article.name}</h2>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Catégorie */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Catégorie</label>
                        <select
                            value={formData.category}
                            name="category"
                            onChange={handleChange}
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                        >
                            <option value="">Choisir une catégorie</option>
                            {articles
                                .flatMap((art) => art.categories.map((cat) => cat.name))
                                .filter((value, index, self) => self.indexOf(value) === index)
                                .map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Nom */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Nom de l'article</label>
                        <input
                            type="text"
                            placeholder="Ex: Chêne pédonculé"
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Image */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Image</label>
                        <input
                            type="file"
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                        />
                    </div>

                    {/* Prix */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Prix (€)</label>
                        <input
                            type="number"
                            placeholder="Ex: 110"
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Description</label>
                        <textarea
                            placeholder="Ajoutez une brève description..."
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta resize-none"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
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
