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

    // Gestionnaire de changement pour tous les inputs
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else if (type === "file") {
            const file = files && files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const result = reader.result as string;
                    // Supprime le préfixe "data:image/xxx;base64," pour n'envoyer que la chaîne base64
                    const base64String = result.split(",")[1];
                    setFormData((prev) => ({
                        ...prev,
                        image: base64String,
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Gestionnaire de soumission du formulaire
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Construction du payload
        // Si formData.image commence par "http", c'est l'URL existante,
        // sinon c'est une nouvelle image (base64) à convertir.
        // Si formData.image commence par "http", c'est l'URL existante,
        // sinon c'est une nouvelle image en base64
        const pictureUrl =
            typeof formData.image === "string" && formData.image.startsWith("http")
                ? formData.image
                : formData.image;

        const payload = {
            categoryName: [formData.category], // Envoi sous forme de tableau
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            available: formData.available,
            ...(pictureUrl ? { pictureUrl } : {}),
        };



        console.log("Payload à envoyer :", payload);

        try {
            const token = localStorage.getItem("token");
            const headers: HeadersInit = {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            };

            const res = await fetch(`http://localhost:3000/api/articles/${article.id}`, {
                method: "PATCH",
                headers,
                body: JSON.stringify(payload),
            });

            const text = await res.text();
            const data = text ? JSON.parse(text) : {};

            if (!res.ok) {
                throw new Error(data.message || "Erreur lors de la mise à jour de l'article.");
            }

            showSuccessToast("Article mis à jour avec succès.");

            setArticles((prevArticles) =>
                prevArticles.map((art) => (art.id === article.id ? data.article : art))
            );
            setSelectedArticle(data.article);
            setIsOpenedEditModal(false);
        } catch (error: any) {
            console.error("Erreur lors de la mise à jour :", error);
            showErrorToast(error.message || "Une erreur est survenue");
        }
    };



    return (
        <>
            {/* Overlay pour fermer la modale */}
            {isOpenedEditModal && (
                <div
                    className="fixed inset-0 bg-black/50 z-10"
                    onClick={() => setIsOpenedEditModal(false)}
                />
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
