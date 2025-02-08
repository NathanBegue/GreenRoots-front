import Card from "../ui/Card";
import Footer from "../layout/Footer";
// import ConnexionModal from "../ui/Connexion-modal";

export default function Index() {
    return (
        <div className="w-full max-w-screen overflow-hidden">
            {/* <ConnexionModal /> */}
            <main className="bg-dark-primary text-white p-6 flex flex-col gap-6 text-center pt-24">
                <section className="flex flex-col gap-6">
                    <h1 className="text-2xl font-bold font-title">
                        🌳 GreenRoots, parce qu'un arbre planté aujourd'hui est une forêt pour demain. 🌳
                    </h1>
                    <div className="flex flex-col gap-6">
                        <h2 className="text-xl font-bold font-title">
                            La déforestation, un enjeu majeur pour la planète
                        </h2>
                        <p className="font-content">
                            Chaque année, 15 milliards d'arbres sont abattus, mais seulement 5 milliards sont replantés. La déforestation entraîne une perte de 10 milliards d’arbres par an, menaçant la biodiversité et accélérant la désertification. En Amazonie, 17% de la forêt a déjà disparu, et en Afrique, le taux de déforestation a augmenté de 150% en 20 ans.
                        </p>
                        <p className="font-content">
                            Notre Solution : Nous avons créé une application mobile qui permet de planter des arbres en un clic. Pour chaque euro dépensé, un arbre est planté. Notre objectif est de planter 1 milliard d’arbres par an, soit 1 arbre pour chaque personne connectée à Internet.
                        </p>
                    </div>
                </section>
                <section className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold font-title">
                        Nos meilleurs arbres
                    </h2>
                    <div className="flex flex-col gap-6">
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}