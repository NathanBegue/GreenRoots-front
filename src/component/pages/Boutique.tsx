import { useEffect, useState } from "react";
import Card from "../ui/Card";
import EditModal from "../ui/Edit-modal";
import DeleteModal from "../ui/Delete-modal";
import fetchmethod from "../../fetch/method-fetch";
import SuivisArbre from "../layout/SuivisArbre";
import { Itrees } from "../../../type/type";
import CreateModal from "../ui/Create-modal";
import { useAuthStore } from "../../Auth/authStore";



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
      : articles.filter((article) => article.category.some((cat) => cat.name === selectedCategory));

  const { isAdmin } = useAuthStore()


  useEffect(() => {
    if (isAdmin) {
      fetchmethod.getArticlesByAdmin().then((data) => setArticles(data));
    } else {
      fetchmethod.getArticle().then((data) => setArticles(data));
    }
  }, []);

  const uniqueCategories = Array.from(
    new Set(
      articles.flatMap((article) =>
        article.categories?.map((cat) => cat.name) || []
      )
    )
  );


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


                {uniqueCategories.map((categoryName, index) => (
                  <option
                    key={index}
                    className="bg-dark-primary text-white text-lg p-2"
                    value={categoryName}
                  >
                    {categoryName}
                  </option>
                ))}

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

