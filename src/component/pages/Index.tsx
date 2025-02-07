import Header from "../layout/Header";

export default function Index() {
    return (
        <div className="w-full max-w-screen overflow-hidden">
            <Header />
            <main className="bg-dark-primary text-white p-6 flex flex-col gap-6 text-center pt-24">
                <section className="flex flex-col gap-6">
                    <h1 className="text-2xl font-bold">
                        🌳 GreenRoots, parce qu'un arbre planté aujourd'hui est une forêt pour demain. 🌳
                    </h1>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-xl font-bold">
                            La déforestation, un enjeu majeur pour la planète
                        </h2>
                        <p>
                            Chaque année, 15 milliards d'arbres sont abattus, mais seulement 5 milliards sont replantés. La déforestation entraîne une perte de 10 milliards d’arbres par an, menaçant la biodiversité et accélérant la désertification. En Amazonie, 17% de la forêt a déjà disparu, et en Afrique, le taux de déforestation a augmenté de 150% en 20 ans.
                        </p>
                        <p>
                            Notre Solution : Nous avons créé une application mobile qui permet de planter des arbres en un clic. Pour chaque euro dépensé, un arbre est planté. Notre objectif est de planter 1 milliard d’arbres par an, soit 1 arbre pour chaque personne connectée à Internet.
                        </p>
                    </div>
                </section>
                <section>
                    <h2>
                        Nos meilleurs arbres
                    </h2>
                </section>
            </main>
        </div>
    )
}