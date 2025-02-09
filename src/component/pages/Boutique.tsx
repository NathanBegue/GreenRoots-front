import { useState } from "react";
import Card from "../ui/Card";
import EditModal from "../ui/Edit-modal";



export default function Boutique() {

    const [isOpenedEditModal, setIsOpenedEditModal] = useState<boolean>(false);



    return (
        <>
            {isOpenedEditModal && <EditModal setIsOpenedEditModal={setIsOpenedEditModal} isOpenedEditModal={isOpenedEditModal} />}

            <div className="w-full max-w-screen overflow-hidden">
                <main className="bg-dark-primary text-white p-6 flex flex-col gap-6 text-center pt-24">

                    <section className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold font-title text-left ">
                            Nos arbres
                        </h2>
                        <div className="flex justify-center">
                            <select
                                name="categories"
                                id="categ-id"
                                className="bg-dark-secondary text-white font-title text-center border border-cta rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cta transition">
                                <option className="bg-dark-primary text-white text-lg p-2" value="">Catégories</option>
                                <option className="bg-dark-primary text-white text-lg p-2" value="fruitiers">Arbres fruitiers</option>
                                <option className="bg-dark-primary text-white text-lg p-2" value="ornement">Arbres d’ornement</option>
                                <option className="bg-dark-primary text-white text-lg p-2" value="forestiers">Arbres forestiers</option>
                                <option className="bg-dark-primary text-white text-lg p-2" value="coniferes">Conifères</option>
                                <option className="bg-dark-primary text-white text-lg p-2" value="croissance-rapide">Arbres à croissance rapide</option>
                                <option className="bg-dark-primary text-white text-lg p-2" value="medicinaux">Arbres médicinaux</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-6">
                            <Card setIsOpenedEditModal={setIsOpenedEditModal} />
                            <Card setIsOpenedEditModal={setIsOpenedEditModal} />
                            <Card setIsOpenedEditModal={setIsOpenedEditModal} />
                        </div>
                    </section>
                </main>
            </div>
        </>
    )
}