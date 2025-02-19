import { useState } from "react";
import { Itrees } from "../../../type/type";

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
    // Type du formulaire
    interface FormDataState {
        category: string;
        name: string;
        image: File | string;
        price: number | string;
        description: string;
        available: boolean;
    }

    const [formData, setFormData] = useState<FormDataState>({
        category: article.categories?.[0]?.name || "Conifères",
        name: article.name,
        image: article.Picture?.url || "",
        price: article.price,
        description: article.description,
        available: true,
    });

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
     * Compresse et redimensionne l'image à l'aide d'un canvas.
     */
    const compressImage = (
        file: File,
        maxWidth: number = 800,
        maxHeight: number = 800,
        quality: number = 0.7
    ): Promise<File> => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = URL.createObjectURL(file);

            image.onload = () => {
                let { width, height } = image;
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.floor((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.floor((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    reject(new Error("Canvas non supporté"));
                    return;
                }
                ctx.drawImage(image, 0, 0, width, height);
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const compressedFile = new File([blob], file.name, { type: blob.type });
                            resolve(compressedFile);
                        } else {
                            reject(new Error("La compression a échoué"));
                        }
                    },
                    "image/jpeg",
                    quality
                );
            };

            image.onerror = (error) => reject(error);
        });
    };

    /**
     * Convertit un fichier en chaîne Base64.
     */
    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let newImageBase64 = "";
        // Si une nouvelle image est fournie, on la compresse et on la convertit en base64
        if (formData.image instanceof File) {
            try {
                const compressedImage = await compressImage(formData.image);
                let base64Image = await convertToBase64(compressedImage);
                newImageBase64 = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");
            } catch (error) {
                console.error("Erreur lors de la compression ou conversion de l'image :", error);
                return;
            }
        }

        // Construction du payload de base
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

        // Si un nouveau fichier image a été fourni, on ajoute imageId et newImageBase64
        if (formData.image instanceof File) {
            // article.Picture?.id doit contenir l'id de l'image existante en BDD
            payload.imageId = article.Picture?.id;
            payload.newImageBase64 = newImageBase64;
        } else {
            // Sinon, on peut envoyer l'URL existante si nécessaire
            payload.pictureUrl =
                typeof formData.image === "string" && formData.image.trim() !== ""
                    ? formData.image.trim()
                    : article.Picture?.url;
        }

        console.log("Payload envoyé :", payload);

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

            setArticles((prev) =>
                prev.map((a) =>
                    a.id === article.id
                        ? {
                            ...a,
                            ...updatedArticle,
                            categories: updatedArticle.categories || a.categories,
                            Picture: updatedArticle.Picture
                                ? updatedArticle.Picture
                                : { url: payload.pictureUrl || a.Picture?.url, description: "Image mise à jour" },
                        }
                        : a
                )
            );
            setSelectedArticle(updatedArticle);
            setIsOpenedEditModal(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'article :", error);
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
