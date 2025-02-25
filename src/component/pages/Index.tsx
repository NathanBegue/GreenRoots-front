/* eslint-disable no-trailing-spaces */
import { useEffect, useState } from "react";
import bgAccueil from "../../assets/images/bgAccueil.jpg";
import Card from "../ui/Card";
import fetchmethod from "../../fetch/method-fetch";
import { Itrees } from "../../../type/type";
import BlocActu from "../ui/BlocActu";

export default function Index({ setIsOpenDetail, setSelectedArticle, isDarkMode, }:
  {
    setIsOpenDetail: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedArticle: React.Dispatch<React.SetStateAction<Itrees | null>>,
    isOpenDetail: boolean,
    isDarkMode: boolean,
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
  }) {

  const [newarticle, setnewarticle] = useState<Itrees[]>([]);

  useEffect(() => {
    fetchmethod.getNewArticle().then((data) => setnewarticle(data));
  }, []);



  return (
    <div className="w-full max-w-screen min-h-screen overflow-hidden lg:pt-10 xl:pt-20">


      <main className={`flex flex-col gap-6 text-center ${isDarkMode ? "dark:bg-dark-primary dark:text-white" : "bg-light-primary text-black"}`}>

        <section className="flex flex-col gap-6 ">

          <h1 className="text-2xl font-bold p-4 pt-25 lg:text-3xl lg:m-8 ">

            🌳 GreenRoots, parce qu'un arbre planté aujourd'hui est une forêt pour demain. 🌳
          </h1>
          <div className="w-screen h-screen bg-cover bg-center pt-30 lg:p-30 2xl:p-80 " style={{ backgroundImage: `url(${bgAccueil})` }}>
            <div className="flex flex-col gap-6 inset-0 dark:bg-black/70  items-center justify-center p-6 bg-white/ text-white py-auto px-10 lg:py-15 2xl:py-40">
              <h2 className="text-xl font-bold font-title lg:text-2xl 2xl:text-5xl">
                La déforestation, un enjeu majeur pour la planète
              </h2>
              <p className="font-content pt-6 lg:text-2xl 2xl:text-3xl ">
                Chaque année, 15 milliards d'arbres sont abattus, mais seulement 5 milliards sont replantés. La déforestation entraîne une perte de 10 milliards d’arbres par an, menaçant la biodiversité et accélérant la désertification. En Amazonie, 17% de la forêt a déjà disparu, et en Afrique, le taux de déforestation a augmenté de 150% en 20 ans.
              </p>
              <p className="font-content lg:text-2xl 2xl:text-3xl">
                Notre Solution : Nous avons créé une application mobile qui permet de planter des arbres en un clic. Pour chaque euro dépensé, un arbre est planté. Notre objectif est de planter 1 milliard d’arbres par an, soit 1 arbre pour chaque personne connectée à Internet.
              </p>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-6 p-6">
          <div className="2xl:pb-20">
            <BlocActu isDarkMode={isDarkMode} />

          </div>
          <h2 className={`text-3xl font-title font-bold text-center ${isDarkMode ? "text-light-primary" : "text-black"}  mb-6 2xl:text-5xl 2xl:pb-10`}>
            🌱  Nos derniers arbres
          </h2>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-6 2xl:w-5/6 m-auto pb-15">
            {newarticle.length > 0 ? (
              newarticle.slice(0, 3).map((article) => (
                <Card
                  key={article.id}
                  article={article}
                  isAdmin={false}
                  setIsOpenDetail={setIsOpenDetail}
                  setSelectedArticle={setSelectedArticle}
                  isDarkMode={isDarkMode}

                />
              ))
            ) : (
              <p className="text-white">Aucun article pour le moment</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}