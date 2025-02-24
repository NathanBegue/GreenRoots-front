import { useEffect, useState } from "react";
import Card from "../ui/Card";
import EditModal from "../ui/Edit-modal";
import DeleteModal from "../ui/Delete-modal";
import fetchmethod from "../../fetch/method-fetch";
import { Itrees } from "../../../type/type";
import CreateModal from "../ui/Create-modal";
import { useAuthStore } from "../../Auth/authStore";
import Loader from "../layout/Loader";



export default function Boutique({
  setIsOpenDetail,
  setSelectedArticle,
  selectedArticle,  // ✅ Ajout ici
  isDarkMode,

}: {
  setIsOpenDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedArticle: React.Dispatch<React.SetStateAction<Itrees | null>>;
  selectedArticle: Itrees | null;  // ✅ Ajout ici
  isOpenDetail: boolean;
  isDarkMode: boolean;

}) {


  // State des modales
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [isOpenedEditModal, setIsOpenedEditModal] = useState<boolean>(false);
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);



  const [articles, setArticles] = useState<Itrees[]>([]);


  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter((article) => article.categories.some((cat) => cat.name === selectedCategory));

  const { isAdmin } = useAuthStore();


  useEffect(() => {
    setIsLoading(true);
    if (isAdmin) {
      fetchmethod.getArticlesByAdmin().then((data) => setArticles(data));
      setIsLoading(false);
    } else {
      fetchmethod.getArticle().then((data) => setArticles(data));
      setIsLoading(false);
    }
  }, []);

  const uniqueCategories = Array.from(
    new Set(
      articles.flatMap((article) =>
        article.categories?.map((cat) => cat.name) || []
      )
    )
  );

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {openCreateModal && <CreateModal
        setOpenCreateModal={setOpenCreateModal}
        isOpenedCreateModal={openCreateModal}
        setArticles={setArticles}
        isDarkMode={isDarkMode}
        articles={articles}
      />}


      {isOpenedEditModal && selectedArticle && (
        <EditModal
          setIsOpenedEditModal={setIsOpenedEditModal}
          isOpenedEditModal={isOpenedEditModal}
          article={selectedArticle} // ✅ Utilisation correcte
          setArticles={setArticles}
          setSelectedArticle={setSelectedArticle}
          isDarkMode={isDarkMode}
          articles={articles}
        />
      )}


      {isOpenedDeleteModal && selectedArticle && (
        <DeleteModal
          setIsOpenedDeleteModal={setIsOpenedDeleteModal}
          isOpenedDeleteModal={isOpenedDeleteModal}
          article={selectedArticle} // ✅ Utilisation correcte

          setArticles={setArticles}
          isDarkMode={isDarkMode}
        />
      )}




      <div className="w-full min-h-screen max-w-screen overflow-hidden ">
        <main className={`${isDarkMode ? "bg-dark-primary text-white" : "bg-light-primary text-black"} p-6 flex flex-col gap-6 text-center pt-24 lg:pt-32`}>
          <section className="flex flex-col gap-6">
            <h2 className={`text-3xl font-title font-bold text-center ${isDarkMode ? "text-light-primary" : "text-black"} mb-6 2xl:text-5xl 2xl:pb-10 2xl:pt-10`}>
              🌱  Nos arbres
            </h2>


            {/* Sélecteur de catégories */}
            <div className="flex flex-col gap-6 items-center md:flex-row md:justify-between md:gap-6 2xl:pb-20">
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                name="categories"
                id="categ-id"
                className={`${isDarkMode ? "bg-dark-secondary text-white" : "bg-light-secondary text-black "} font-title text-center border border-cta rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cta transition md:py-2 md:px-2 md:text-2xl`}>
                <option className="bg-dark-primary text-white text-lg p-2" value="All">Catégories</option>


                {uniqueCategories.map((categoryName, index) => (
                  <option
                    key={index}
                    className={`${isDarkMode ? "bg-dark-primary text-white" : "bg-light-secondary text-black"} text-lg p-2`}
                    value={categoryName}
                  >
                    {categoryName}
                  </option>
                ))}

              </select>
              {isAdmin &&
                <button onClick={() => setOpenCreateModal(true)} type="submit" className={`${isDarkMode ? "bg-dark-accent text-white" : "bg-light-secondary text-black"} flex justify-center items-center gap-2 rounded-lg border p-2  font-content md:text-2xl md:py-2 md:px-3`}>
                  Ajouter un arbre +
                </button>}



            </div>
            {/* Affichage des articles */}


            <div className="flex flex-col gap-6 items-center md:grid md:grid-cols-3 md:gap-6 ">
              {articles.length > 0 ? (
                filteredArticles.map((article) => (
                  <Card
                    key={article.id}
                    article={article}
                    isAdmin={isAdmin}
                    setIsOpenedEditModal={setIsOpenedEditModal}
                    setIsOpenedDeleteModal={setIsOpenedDeleteModal}
                    setSelectedArticle={setSelectedArticle}
                    setIsOpenDetail={setIsOpenDetail}
                    isDarkMode={isDarkMode}

                  />
                ))
              ) : (

                <p>Aucun article disponible.</p>
              )}
            </div>
          </section>

        </main>
      </div>
    </>
  );
}

