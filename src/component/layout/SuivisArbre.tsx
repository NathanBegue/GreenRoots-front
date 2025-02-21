import { useEffect, useState } from "react";
import { useAuthStore } from "../../Auth/authStore";
import Map from "../ui/Map";
import { Itracking } from "../../../type/type";

export default function SuivisArbre({ isDarkMode }: { isDarkMode: boolean }) {

  // State pour stocker les données de suivi des commandes
  const [ordersTracking, setOrdersTracking] = useState<Itracking[]>([]);

  // Récupération de l'ID de la commande depuis le localStorage
  const orderId = localStorage.getItem('orderId');

  // Fonction pour récupérer le suivi de la commande
  const getOrderTracking = async () => {
    if (orderId) {
      console.log('L\'ID de la commande récupéré :', orderId);
    } else {
      console.log('Aucun ID de commande trouvé dans le localStorage');
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Tracking des commandes :", ordersTracking);


      const response = await fetch(`http://localhost:3000/${isAdmin ? "api" : "compte"}/commandes/${orderId}/suivi`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Données reçues :", data);

      // Vérification du format des données et mise à jour de l'état
      if (Array.isArray(data)) {
        setOrdersTracking(data);  // Si c'est déjà un tableau, on l'utilise
      } else {
        setOrdersTracking(data.articles || []);  // Sinon, on extrait `articles`
      }
    } catch (error) {
      console.error("Erreur lors du fetch des commandes :", error);
    }
  };

  const { isAdmin } = useAuthStore();

  // Récupération et mise à jour de l'état des données lors du premier rendu
  useEffect(() => {
    getOrderTracking();
  }, []);  // Cette dépendance vide garantit l'exécution une seule fois après le premier rendu

  useEffect(() => {
    console.log("⚙️ Données brutes reçues :", ordersTracking);
  }, [ordersTracking]);



  function calculerAgeAvecHeures(dateString) {
    const dateDeNaissance = new Date(dateString);
    const aujourdHui = new Date();

    let age = aujourdHui.getFullYear() - dateDeNaissance.getFullYear();
    let mois = aujourdHui.getMonth() - dateDeNaissance.getMonth();
    let jours = aujourdHui.getDate() - dateDeNaissance.getDate();
    let heures = aujourdHui.getHours() - dateDeNaissance.getHours();

    // Ajuster l'âge si le mois est négatif ou si c'est le même mois mais un jour avant
    if (mois < 0 || (mois === 0 && jours < 0)) {
      age--;
      mois += 12;
    }

    // Ajuster si le nombre de jours est négatif
    if (jours < 0) {
      const dernierMois = new Date(aujourdHui.getFullYear(), aujourdHui.getMonth(), 0);
      jours += dernierMois.getDate();
      mois--;
    }

    // Ajuster si les heures sont négatives
    if (heures < 0) {
      heures += 24; // Ajouter les 24 heures du jour précédent
      jours--; // Enlever un jour
      if (jours < 0) {
        mois--; // Enlever un mois si nécessaire
        const dernierMois = new Date(aujourdHui.getFullYear(), aujourdHui.getMonth(), 0);
        jours += dernierMois.getDate(); // Ajouter les jours du mois précédent
      }
    }

    return {
      années: age,
      mois: mois,
      jours: jours,
      heures: heures
    };
  }

  const dateExemple = "2025-02-20T14:19:16.580Z";
  const ageComplet = calculerAgeAvecHeures(dateExemple);

  console.log(`Âge : ${ageComplet.années} ans, ${ageComplet.mois} mois, ${ageComplet.jours} jours, ${ageComplet.heures} heures`);


  return (
    <div className={`flex flex-wrap gap-20 bg-dark-primary ${!isDarkMode && "bg-light-primary"} h-fit w-full m-auto max-w-7xl rounded-lg justify-center`}>
      {ordersTracking.map((order) =>
        order.ArticleTrackings.slice(0, order.ArticleHasOrder.quantity).map((tracking, index) => (

          <div
            key={`${order.id}-${tracking.id}-${index}`}
            className="bg-dark-secondary w-sm md:w-md lg:w-lg h-full flex flex-col gap-4 border-zinc-200 p-6 text-white justify-center rounded-lg border shadow-black shadow-lg "
          >
            {isAdmin ? (
              <div className="flex gap-2 p-2">
                <button onClick={() => {
                  console.log('Modifier', article);
                  setIsOpenedEditModal && setIsOpenedEditModal(true);
                  setSelectedArticle && setSelectedArticle(article);
                }}
                  className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition md:w-8 lg:w-10 lg:h-12 cursor-pointer hover:scale-110">
                  <img src="/images/icons/edit.svg" alt="Modifier" className="w-6 h-6 invert" />
                </button>

                <button onClick={() => {
                  console.log('Supprimer', article);
                  setIsOpenedDeleteModal && setIsOpenedDeleteModal(true);
                  setSelectedArticle && setSelectedArticle(article);
                }}
                  className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition lg:w-10 lg:h-12 md:w-8 mr-2 cursor-pointer hover:scale-110">
                  <img src="/images/icons/trash.svg" alt="Supprimer" className="w-6 h-6 invert " />
                </button>
              </div>
            ) : null}
            <h2 className="text-white text-center">🌿 {order.name}</h2>


            < h3 className="text-white text-center"> Surnom : {tracking.nickname}</h3>

            <div>
              <img src={tracking.Picture.url} alt="" />
            </div>
            <div className="mb-4">
              <div className="text-sm">
                <strong>Lieu :</strong> {tracking.plant_place || "Non défini"}
              </div>
              <div>
                <strong>Statut :</strong> {tracking.status}
              </div>
              <div>
                <strong>Croissance :</strong> {tracking.growth}
              </div>
              <div>
                <strong>Age : </strong>{calculerAgeAvecHeures(tracking.created_at).années} ans, {calculerAgeAvecHeures(tracking.created_at).mois} mois, {calculerAgeAvecHeures(tracking.created_at).jours} jours, {calculerAgeAvecHeures(tracking.created_at).heures} heures

              </div>
            </div>

            <div className="w-full h-full m-auto">
              <h3 className="text-white text-xl text-center pb-1">📍 Localisation :</h3>
              <Map />
            </div>
          </div>
        ))
      )
      }
    </div >
  );


}
