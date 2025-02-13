import { useEffect, useState } from "react";
import Card from "../ui/Card";
import EditModal from "../ui/Edit-modal";
import DeleteModal from "../ui/Delete-modal";
import fetchmethod from "../../fetch/method-fetch";
import SuivisArbre from "../layout/SuivisArbre";
import { Itrees } from "../../../type/type";
import CreateModal from "../ui/Create-modal";



export default function Boutique() {

  // State des modales
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [isOpenedEditModal, setIsOpenedEditModal] = useState<boolean>(false);
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState<boolean>(false);


  const [articles, setArticles] = useState<Itrees[]>([]);
  // stockage de l'id de l'article selectionné
  const [selectedArticle, setSelectedArticle] = useState<Itrees | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles =
  selectedCategory === "All"
    ? articles
    : articles.filter((article) =>  article.categories.some((cat) => cat.name === selectedCategory));
 

  useEffect(() => {
    fetchmethod.getArticles().then((data) => setArticles(data));
  }, []);



  return (
    <>
      {openCreateModal && <CreateModal
        setOpenCreateModal={setOpenCreateModal}
        isOpenedCreateModal={openCreateModal}
        setArticles={setArticles}
      />}


            {isOpenedEditModal && selectedArticle && (
                <EditModal
                    setIsOpenedEditModal={setIsOpenedEditModal}
                    isOpenedEditModal={isOpenedEditModal}
                    article={selectedArticle} // On s'assure que selectedArticle n'est pas null
                    setArticles={setArticles}
                    setSelectedArticle={setSelectedArticle}
                />
            )}

            {isOpenedDeleteModal && selectedArticle && (
                <DeleteModal
                    setIsOpenedDeleteModal={setIsOpenedDeleteModal}
                    isOpenedDeleteModal={isOpenedDeleteModal}
                    article={selectedArticle} // On s'assure que selectedArticle n'est pas null
                    setArticles={setArticles}
                />
            )}



      <div className="w-full max-w-screen overflow-hidden ">
        <main className="bg-dark-primary text-white p-6 flex flex-col gap-6 text-center pt-24 lg:pt-32">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold font-title text-center md:text-4xl">
                            Nos arbres
            </h2>


            {/* Sélecteur de catégories */}
            <div className="flex flex-col gap-6 items-center md:flex-row md:justify-between md:gap-6">
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                name="categories"
                id="categ-id"
                className="bg-dark-secondary text-white font-title text-center border border-cta rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cta transition md:py-2 md:px-2 md:text-2xl">
                <option className="bg-dark-primary text-white text-lg p-2" value="All">Catégories</option>
                <option className="bg-dark-primary text-white text-lg p-2" value="Arbres fruitiers">Arbres fruitiers</option>
                <option className="bg-dark-primary text-white text-lg p-2" value="Arbres d'ornement">Arbres d’ornement</option>
                <option className="bg-dark-primary text-white text-lg p-2" value="Arbres forestiers">Arbres forestiers</option>
                <option className="bg-dark-primary text-white text-lg p-2" value="Conifères">Conifères</option>
                <option className="bg-dark-primary text-white text-lg p-2" value="Arbres à croissance rapide">Arbres à croissance rapide</option>
                <option className="bg-dark-primary text-white text-lg p-2" value="Arbres médicinaux">Arbres médicinaux</option>
                <option className="bg-dark-primary text-white text-lg p-2" value="Arbres mellifères">Arbres mellifères</option>
                <option className="bg-dark-primary text-white text-lg p-2" value="Arbres légendaires">Arbres légendaires</option>
                <option className="bg-dark-primary text-white text-lg p-2" value="Arbres tropicaux">Arbres tropicaux</option>
                <option className="bg-dark-primary text-white text-lg p-2" value="Arbres feuillus">Arbres feuillus</option>




              </select>
              <button onClick={() => setOpenCreateModal(true)} type="submit" className="bg-dark-accent text-cta flex justify-center items-center gap-2 rounded-lg border p-2  font-content md:text-2xl md:py-2 md:px-3">
                                Ajouter un arbre +
              </button>

       
            </div>
            {/* Affichage des articles */}


            <div className="flex flex-col gap-6 items-center md:grid md:grid-cols-3 md:gap-6 ">
              {articles.length > 0 ? (
                filteredArticles.map((article) => (
                  <Card
                    key={article.id}
                    article={article}
                    isAdmin={true}
                    setIsOpenedEditModal={setIsOpenedEditModal}
                    setIsOpenedDeleteModal={setIsOpenedDeleteModal}
                    setSelectedArticle={setSelectedArticle}
                  />
                ))
              ) : (

                <p>Aucun article disponible.</p>
              )}
            </div>
          </section>
          <h2 className="font-title font-bold text-2xl text-center  text-white mt-6">Suivi d'arbre</h2>
          <div className=" md:flex md:flex-row ">
            <SuivisArbre />
            <SuivisArbre />
            <SuivisArbre />
          </div>
        </main>
      </div>
    </>
  );
}

