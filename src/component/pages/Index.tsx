import bgAccueil from "../../assets/images/bgAccueil.jpg"
import Card from "../ui/Card";

// import ConnexionModal from "../ui/Connexion-modal";

export default function Index() {
    return (
        <div className="w-full max-w-screen overflow-hidden">
            {/* <ConnexionModal /> */}

            <main className="bg-dark-primary text-white  flex flex-col gap-6 text-center ">
                <section className="flex flex-col gap-6 ">
                    <h1 className="text-2xl font-bold font-title pt-20 lg:text-3xl">

                        🌳 GreenRoots, parce qu'un arbre planté aujourd'hui est une forêt pour demain. 🌳
                    </h1>
                    <div className="w-screen h-screen bg-cover bg-center pt-30" style={{ backgroundImage: `url(${bgAccueil})` }}>
                        <div className="flex flex-col gap-6 inset-0 bg-black/60  items-center justify-center p-6">
                            <h2 className="text-xl font-bold font-title">
                                La déforestation, un enjeu majeur pour la planète
                            </h2>
                            <p className="font-content pt-6 lg:text-2xl">
                                Chaque année, 15 milliards d'arbres sont abattus, mais seulement 5 milliards sont replantés. La déforestation entraîne une perte de 10 milliards d’arbres par an, menaçant la biodiversité et accélérant la désertification. En Amazonie, 17% de la forêt a déjà disparu, et en Afrique, le taux de déforestation a augmenté de 150% en 20 ans.
                            </p>
                            <p className="font-content lg:text-2xl">
                                Notre Solution : Nous avons créé une application mobile qui permet de planter des arbres en un clic. Pour chaque euro dépensé, un arbre est planté. Notre objectif est de planter 1 milliard d’arbres par an, soit 1 arbre pour chaque personne connectée à Internet.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col gap-6 p-6">
                    <h2 className="text-2xl font-bold font-title">
                        Nos meilleurs arbres
                    </h2>
                    <div className="flex flex-col gap-6 xl:flex-row">
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </section>
            </main>
        </div>
    )
}