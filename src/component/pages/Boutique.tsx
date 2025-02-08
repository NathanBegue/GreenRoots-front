import Card from "../ui/Card";
import Footer from "../layout/Footer";


export default function Boutique() {
    return (
        <div className="w-full max-w-screen overflow-hidden">
            <main className="bg-dark-primary text-white p-6 flex flex-col gap-6 text-center pt-24">

                <section className="flex flex-col gap-6">
                    <h2 className="text-2xl font-bold font-title text-left ">
                        Nos arbres
                    </h2>
                    <div className="flex justify-end">
                        <select name="categories" id="categ-id" className="bg-cta font-title text-right box-border max-w-42 rounded-md">
                            <option className="text-left" value="">catégories</option>
                            <option className="text-left" value="dog">Arbres fruitiers</option>
                            <option className="text-left" value="cat">Arbres d’ornement</option>
                            <option className="text-left" value="hamster">Arbres forestiers
                            </option>
                            <option className="text-left" value="parrot">Conifères</option>
                            <option className="text-left" value="spider">Arbres à croissance rapide</option>
                            <option className="text-left" value="goldfish">Arbres médicinaux</option>
                        </select>
                    </div>

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