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


    useEffect(() => {
        fetchmethod.getArticles().then((data) => setArticles(data));
    }, []);


    return (
        <>
            {openCreateModal && <CreateModal setOpenCreateModal={setOpenCreateModal} openCreateModal={openCreateModal} />}
            {isOpenedEditModal && <EditModal setIsOpenedEditModal={setIsOpenedEditModal} isOpenedEditModal={isOpenedEditModal}
                article={selectedArticle} />}
            {isOpenedDeleteModal && <DeleteModal setIsOpenedDeleteModal={setIsOpenedDeleteModal} isOpenedDeleteModal={isOpenedDeleteModal}
                article={selectedArticle} />}


            <div className="w-full max-w-screen overflow-hidden ">
                <main className="bg-dark-primary text-white p-6 flex flex-col gap-6 text-center pt-24 lg:pt-32">
                    <section className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold font-title text-center md:text-4xl">
                            Nos arbres
                        </h2>


                        {/* Sélecteur de catégories */}
                        <div className="flex flex-col gap-6 items-center md:flex-row md:justify-between md:gap-6">
                            <select
                                name="categories"
                                id="categ-id"
                                className="bg-dark-secondary text-white font-title text-center border border-cta rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cta transition md:py-6 md:px-4 md:text-2xl">
                                <option className="bg-dark-primary text-white text-lg p-2" value="">Catégories</option>
                                <option className="bg-dark-primary text-white text-lg p-2" value="fruitiers">Arbres fruitiers</option>
                                <option className="bg-dark-primary text-white text-lg p-2" value="ornement">Arbres d’ornement</option>
                                <option className="bg-dark-primary text-white text-lg p-2" value="forestiers">Arbres forestiers</option>
                                <option className="bg-dark-primary text-white text-lg p-2" value="coniferes">Conifères</option>
                                <option className="bg-dark-primary text-white text-lg p-2" value="croissance-rapide">Arbres à croissance rapide</option>
                                <option className="bg-dark-primary text-white text-lg p-2" value="medicinaux">Arbres médicinaux</option>
                            </select>
                            <button onClick={() => setOpenCreateModal(true)} type="submit" className="bg-dark-accent text-cta flex justify-center items-center gap-2 rounded-lg border p-2  font-content md:text-2xl md:py-6 md:px-4">
                                Ajouter un arbre +
                            </button>
                        </div>




                        {/* Affichage des articles */}
                        <div className="flex flex-col gap-6 items-center md:grid md:grid-cols-3 md:gap-6">
                            {articles.length > 0 ? (
                                articles.map((article) => (
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
                    <div>
                        <SuivisArbre />
                        <SuivisArbre />
                        <SuivisArbre />
                    </div>




                </main>
            </div>
        </>
    );
}

