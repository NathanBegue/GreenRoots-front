import { useEffect, useState } from "react";
import { useAuthStore } from "../../Auth/authStore";
import Map from "../ui/Map";
import { Itracking } from "../../../type/type";


export default function SuivisArbre() {

  const [ordersTracking, setOrdersTracking] = useState<Itracking[]>([]);


  const orderId = localStorage.getItem('orderId');
  // fetch tracking d'une commande

  const getOrderTracking = async () => {

    if (orderId) {
      console.log('L\'ID de la commande récupéré :', orderId);
    } else {
      console.log('Aucun ID de commande trouvé dans le localStorage');
    }

    try {
      const token = localStorage.getItem("token");
      console.log("ordersTracking :", ordersTracking);

      const response = await fetch(`http://localhost:3000/compte/commandes/${orderId}/suivi`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Données reçues :", data);
      setOrdersTracking(data);

      // Si data est un tableau, on le retourne directement,
      // sinon on tente de retourner data.orders ou un tableau vide
      return data
    } catch (error) {
      console.error("Erreur lors du fetch des commandes :", error);
      return [];
    }
  }




  const [formData, setFormData] = useState<Itracking>({

    nickname: "",
    picture_id: "",
    plant_place: "",
    article_id: "",
    article_has_order_id: "",
    status: "",
    growth: "",
  });


  const { isAdmin } = useAuthStore();



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

  useEffect(() => {
    getOrderTracking().then((data) => {
      console.log("🚀 Données reçues :", data);

      if (Array.isArray(data)) {
        setOrdersTracking(data);  // ✅ Si c'est déjà un tableau, on l'utilise directement
      } else {
        setOrdersTracking(data.articles || []);  // ✅ Si data contient un objet, on extrait `articles`
      }
    });
  }, []);





  return (

    <div className="bg-dark-primary h-fit  w-fit m-auto  md:w-md lg:w-lg rounded-sm md:rounded-md lg:rounded-lg">

      {console.log(ordersTracking)}
      {
        ordersTracking.map((orderTracking) =>

          <div key={orderTracking.article_id} className="bg-dark-secondary w-auto h-full flex flex-col  border-zinc-200 p-6 text-white justify-center rounded-sm md:rounded-md lg:rounded-lg border shadow-black shadow-lg">

            {isAdmin &&

              <div className="flex gap-2 justify-end">
                <button
                  className="p-2 bg-yellow-500 rounded-lg cursor-pointer hover:bg-yellow-600 transition">

                  <img src="/images/icons/edit.svg" alt="Modifier" className="w-6 h-6 invert" />
                </button>

                <button
                  className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition cursor-pointer">

                  <img src="/images/icons/trash.svg" alt="Supprimer" className="w-6 h-6 invert" />
                </button>
              </div>
            }
            <h2 className="text-white bg-dark-secondary"> Coucou {orderTracking.name}</h2>
            <div className="pb-2 text-content text-ms md:text-md lg:text-lg">
              <label htmlFor="lieu" id="lieu" >Lieu :</label>
              <input type="text" id="lieu" name="lieu" className="text-white h-7 w-25 ml-2" placeholder=" Sao Paulo" />

            </div>
            <div className="pb-2 text-content text-ms md:text-md lg:text-lg">
              <label htmlFor="croissance" id="croissance" >Croissance :</label>
              <input
                type="text"
                id="croissance"
                name="croissance"
                className="text-white h-7 w-75 ml-2"

                value={orderTracking.ArticleTrackings[0].growth
                }
              />
            </div>
            <div className="pb-2 text-content text-ms md:text-md lg:text-lg">
              <label htmlFor="status" id="status" >Status :</label>
              <input type="text" id="status" name="status" className="text-white-7 w-25 ml-2" placeholder="En fleuraison" />
            </div>
            <div className="pb-2 text-content text-ms md:text-md lg:text-lg">
              <label htmlFor="nbrSuivi" id="nbrSuivi" > commande :</label>
              <input type="nbrSuivi" id="nbrSuivi" name="nbrSuivi" className="text-white h-7 w-25 ml-2" placeholder=" 4321789" value={orderTracking.article_has_order_id} />
            </div>
            <div className="pb-2 text-content text-ms md:text-md lg:text-lg">
              <label htmlFor="birthday" id="birthday" >Date de plantation :</label>
              <input type="birthday" id="birthday" name="birthday" className="text-white h-7 w-25 ml-2" placeholder=" 22/07/22" />
            </div>
            <div className="pb-2 text-content text-ms md:text-md lg:text-lg">
              <label htmlFor="age" id="age" >Age  :</label>
              <input type="age" id="age" name="age" className="text-white h-7 w-25 ml-2 mb-2" placeholder=" 2 ans" />
            </div>
            <div className="flex justify-center items-center pb-8">

              <input type="image" id="image" name="image" className="bg-zinc-200 h-40 w-40 ml-2 rounded-xl" src="images/arbres/Acacia.webp" />
            </div>
            <div className="w-full h-full m-auto">
              <h2 className="text-white text-2xl font-title text-center pb-1"> Localisation de l'arbre : </h2>
              <div className="flex justify-center items-center pb-4">
                <label htmlFor="position" id="position" >Position:</label>
                <input type="position" id="position" name="position" className="text-white h-7 w-25 ml-2 mb-2" placeholder=" 48.8566" />
              </div>

              <Map />
            </div>
          </div>
        )
      }


    </div>

  );
}