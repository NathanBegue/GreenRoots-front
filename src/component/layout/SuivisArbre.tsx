import Map from "../ui/Map";


export default function SuivisArbre() {
    return (
        <div className="bg-dark-primary flex-col h-full pb-2 lg:pt-20">

            <h2 className="font-title font-bold text-2xl text-center mb-6 text-white ">Suivi d'arbre</h2>
            <div className="bg-dark-secondary w-auto h-full flex flex-col border-2 border-zinc-200 p-2 shadow-xl mr-4 ml-4 text-white justify-center rounded-lg border shadow-black shadow-lg">
                <div className="flex gap-2 justify-end">
                    <button onClick={() => setIsOpenedEditModal(true)}
                        className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition">

                        <img src="/images/icons/edit.svg" alt="Modifier" className="w-6 h-6 invert" />
                    </button>

                    <button onClick={() => setIsOpenedDeleteModal(true)}
                        className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition">

                        <img src="/images/icons/trash.svg" alt="Supprimer" className="w-6 h-6 invert" />
                    </button>
                </div>
                <div className="pb-2">
                    <label htmlFor="lieu" id="lieu" >Lieu :</label>
                    <input type="text" id="lieu" name="lieu" className="text-white h-7 w-25 ml-2" placeholder=" Sao Paulo" />

                </div>
                <div className="pb-2">
                    <label htmlFor="croissance" id="croissance" >Croissance :</label>
                    <input type="text" id="croissance" name="croissance" className="text-white h-7 w-25 ml-2" placeholder="1 mètre" />
                </div>
                <div className="pb-2">
                    <label htmlFor="status" id="status" >Status :</label>
                    <input type="text" id="status" name="status" className="text-white-7 w-25 ml-2" placeholder="En fleuraison" />
                </div>
                <div className="pb-2">
                    <label htmlFor="nbrSuivi" id="nbrSuivi" >Numéro de suivi :</label>
                    <input type="nbrSuivi" id="nbrSuivi" name="nbrSuivi" className="text-white h-7 w-25 ml-2" placeholder=" 4321789" />
                </div>
                <div className="pb-2">
                    <label htmlFor="birthday" id="birthday" >Date de plantation :</label>
                    <input type="birthday" id="birthday" name="birthday" className="text-white h-7 w-25 ml-2" placeholder=" 22/07/22" />
                </div>
                <div>
                    <label htmlFor="age" id="age" >Age  :</label>
                    <input type="age" id="age" name="age" className="text-white h-7 w-25 ml-2 mb-2" placeholder=" 2 ans" />
                </div>
                <div className="flex justify-center items-center pb-8">
                    <label htmlFor="image" id="image" >Image  :</label>
                    <input type="image" id="image" name="image" className="bg-zinc-200 h-40 w-40 ml-2" src="images/arbres/Acacia.webp" />
                </div>
                <div className="w-full h-full m-auto">
                    <h2 className="text-white text-2xl font-title text-center pb-1"> Localisation de l'arbre : </h2>
                    <div className="flex justify-center items-center pb-4">
                        <label htmlFor="position" id="position" >Position:</label>
                        <input type="position" id="position" name="position" className="text-white h-7 w-25 ml-2 mb-2" placeholder=" 48.8566" />
                    </div>

                    <Map />
                </div>
            </div>
        </div>
    );
}