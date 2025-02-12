import { useState } from "react";


export default function CreateModal({
    setOpenCreateModal,
    isOpenedCreateModal
}: {
    isOpenedCreateModal: boolean;
    setOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    // State pour stocker les valeurs du formulaire
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        price: "",
        description: "",
        category: "",
        available: true,
    });


    // Fonction pour gérer les changements de champ
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.name === "price" ? Number(e.target.value) : e.target.value,
        });
    };



    // Fonction pour gérer l'envoi du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        try {
            const response = await fetch("http://localhost:5000/api/articles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    price: Number(formData.price), // Conversion en nombre
                    categoryName: [formData.category],
                    pictureUrl: formData.url, // On envoie l'URL de l'image
                    description: formData.description,
                    available: formData.available,
                }),
            });


            const data = await response.json();
            console.log("Article ajouté avec succès :", data);
            setOpenCreateModal(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'article :", error);
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
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-secondary w-80 p-6 rounded-lg shadow-lg text-white flex flex-col gap-4 z-20 mt-8">
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
                            /* multiple={true} */
                            name="category"
                            onChange={handleChange}
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                        >
                            <option value="">Choisir une catégorie</option>
                            <option value="Arbres fruitiers">Arbres fruitiers</option>
                            <option value="Arbres d'ornement">Arbres d'ornement</option>
                            <option value="Arbres forestiers">Arbres forestiers</option>
                            <option value="Conifères">Conifères</option>
                            <option value="Arbres à croissance rapide">Arbres à croissance rapide</option>
                            <option value="Arbres médicinaux">Arbres médicinaux</option>
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


                    {/* Image URL */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Image (URL)</label>
                        <input
                            type="text"
                            placeholder="https://exemple.com/image.jpg"
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
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



