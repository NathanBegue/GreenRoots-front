import { useEffect, useState } from "react";
import { Iorder, ITracking } from "../../../type/type";
import { useAuthStore } from "../../Auth/authStore";
import fetchmethod from "../../fetch/method-fetch";

interface TrackingArticleModalProps {
    setOrdersTracking: React.Dispatch<React.SetStateAction<ITracking[]>>;
    setTrackingModal: React.Dispatch<React.SetStateAction<boolean>>;
    trackingModal: boolean;
    isDarkMode: boolean;// Ajout d'un ID pour le suivi
    ordersTracking: Iorder[];
}

export default function TrackingArticleModal({
    setOrdersTracking,
    ordersTracking,
    setTrackingModal,
    trackingModal,
    isDarkMode,
}: TrackingArticleModalProps) {

    const { isAdmin } = useAuthStore();
    const [getDetailOneTracking, setGetDetailOneTracking] = useState<Iorder[]>([]);
    const [formData, setFormData] = useState({
        location: "",
        image: null as File | null,
        status: "",
        growth: "",
    });

    // Récupération de l'ID de la commande depuis le localStorage
    const orderIdString = localStorage.getItem("orderId");

    const orderId = orderIdString ? parseInt(orderIdString, 10) : 0;

    useEffect(() => {
        const fetchTrackingDetails = async () => {
            try {
                const trackingIds = ordersTracking.flatMap(order =>
                    order.ArticleTrackings?.map(tracking => tracking.id) || []
                );

                console.log("Tracking IDs récupérés :", trackingIds);

                // Boucle pour fetch chaque tracking ID
                const fetchPromises = trackingIds.map(async (trackingId) => {
                    const data = isAdmin
                        ? await fetchmethod.getTrackingByIdAdmin(orderId, trackingId)
                        : await fetchmethod.getTrackingByIdUser(orderId, trackingId);

                    console.log(`Données reçues pour tracking ID ${trackingId}:`, data);
                    return data;
                });

                // Récupérer toutes les données une fois les fetchs terminés
                const allTrackingData = await Promise.all(fetchPromises);

                // Aplatir les résultats et les stocker
                setGetDetailOneTracking(allTrackingData.flat());
            } catch (error) {
                console.error("Erreur lors de la récupération des détails :", error);
            }
        };

        if (trackingModal) {
            fetchTrackingDetails();
        }
    }, [trackingModal, isAdmin, ordersTracking, orderId]);



    // Gestion des changements dans le formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;
        if (files && files.length > 0) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // Logique pour envoyer les données modifiées au backend
        setTrackingModal(false);
    };

    return (
        <>
            {/* Overlay pour fermer la modale */}
            {trackingModal && (
                <div
                    className="fixed inset-0 bg-black/50 z-10"
                    onClick={() => setTrackingModal(false)}
                />
            )}

            {/* Modale */}
            <div
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black"
                    } w-80 p-6 rounded-lg shadow-lg flex flex-col gap-4 z-20 mt-8`}
            >
                {/* Bouton de fermeture */}
                <img
                    onClick={() => setTrackingModal(false)}
                    src="/images/icons/close.svg"
                    alt="Fermer la modale"
                    className={`w-6 h-6 ${isDarkMode && "invert"} absolute top-4 right-4 cursor-pointer`}
                />

                {/* Titre */}
                <h2 className="text-xl font-bold text-center">Modifier le suivi</h2>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* Lieu */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Lieu</label>
                        <input
                            type="text"
                            placeholder="Ex: Jardin central"
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                            name="location"
                            value={formData.location}
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

                    {/* Status */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Status</label>
                        <input
                            type="text"
                            placeholder="Ex: En croissance"
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Croissance */}
                    <div className="flex flex-col">
                        <label className="font-semibold mb-1">Croissance</label>
                        <textarea
                            placeholder="Ex: L'arbre a pris 15 cm ce mois-ci..."
                            className="border p-3 rounded-lg bg-dark-primary text-white focus:outline-none focus:ring-2 focus:ring-cta resize-none"
                            name="growth"
                            value={formData.growth}
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
                            onClick={() => setTrackingModal(false)}
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