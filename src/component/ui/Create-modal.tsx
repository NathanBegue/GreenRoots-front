import { useState } from "react";
import { Itrees } from "../../../type/type";


export default function CreateModal({
    setOpenCreateModal,
    isOpenedCreateModal,
    setArticles,
    isDarkMode,
    articles
}: {
    articles: Itrees[];
    isOpenedCreateModal: boolean;
    setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
    setArticles: React.Dispatch<React.SetStateAction<Itrees[]>>;
    isDarkMode: boolean
}) {
    // State pour stocker les valeurs du formulaire
    interface FormDataState {
        name: string;
        image: File | null;
        price: string;
        description: string;
        category: string;
        available: boolean;
    }

    const [formData, setFormData] = useState<FormDataState>({
        name: "",
        image: null, // ✅ Correct
        price: "",
        description: "",
        category: "Arbres d'ornement",
        available: true,
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (e.target.type === "file") {
            const file = (e.target as HTMLInputElement).files?.[0] || null;
            setFormData((prev) => ({ ...prev, image: file }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.name === "price" ? Number(e.target.value) : e.target.value,
            }));
        }
    };

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

        if (!formData.name.trim()) {
            console.error("❌ Erreur : Le champ nom est vide !");
            return;
        }

        let base64Image = "";

        if (formData.image) {
            try {
                base64Image = await convertToBase64(formData.image);
                base64Image = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");
            } catch (error) {
                console.error("❌ Erreur lors de la conversion de l'image :", error);
                return;
            }
        }

        const dataToSend = {
            name: formData.name,
            price: Number(formData.price),
            categoryName: [formData.category], // Envoi sous forme de tableau
            description: formData.description,
            available: formData.available,
            pictureUrl: base64Image, // Image nettoyée
        };

        console.log("🟢 Données envoyées à l'API :", dataToSend);

        try {
            const response = await fetch("http://localhost:3000/api/articles", {
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
    };


    return (
        <>
            {/* Overlay pour fermer la modale en cliquant à l'extérieur */}
            {isOpenedCreateModal && (
                <div
                    className="fixed inset-0 bg-black/50 z-10"
                    onClick={() => setOpenCreateModal(false)}
                />
            )}


            {/* Modale */}
            <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"} w-80 p-6 rounded-lg shadow-lg  flex flex-col gap-4 z-20 mt-8`}>
                {/* Bouton de fermeture */}
                <img
                    onClick={() => setOpenCreateModal(false)}
                    src="/images/icons/close.svg"
                    alt="Fermer la modale"
                    className="w-6 h-6 invert absolute top-4 right-4 cursor-pointer"
                />


                {/* Titre */}
                <h2 className="text-xl font-bold text-center">Ajouter un article</h2>


                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Catégorie */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Catégorie</label>
                        <select
                            defaultValue={formData.category}
                            name="category"
                            onChange={handleChange}
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                        >
                            <option value="">Choisir une catégorie</option>
                            {articles
                                .flatMap((article) => article.categories.map((cat) => cat.name)) // Récupère toutes les catégories
                                .filter((value, index, self) => self.indexOf(value) === index) // Supprime les doublons
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


                    {/* Image file */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Image</label>
                        <input
                            type="file"
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
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
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    {/* Boutons */}
                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
                            onClick={() => setOpenCreateModal(false)}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="bg-cta px-4 py-2 rounded-lg text-white hover:bg-cta-dark transition"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}



