export default function SuivisArbre() {
    return (
        <div className="bg-dark-primary flex-col m-auto">
            <h2 className="font-title font-bold text-2xl text-center pt-5 ">Suivi d'arbre</h2>
            <div className="bg-zinc-100 w-86 h-110 flex flex-col border-2 border-zinc-200 p-2 shadow-xl mb-4 mt-2 ml-4 ">
                <div className="pb-2">
                    <label htmlFor="lieu" id="lieu" >Lieu :</label>
                    <input type="text" id="lieu" name="lieu" className="bg-zinc-200 h-8 w-25 ml-2" placeholder=" Sao Paulo" />
                </div>
                <div className="pb-2">
                    <label htmlFor="croissance" id="croissance" >Croissance :</label>
                    <input type="text" id="croissance" name="croissance" className="bg-zinc-200 h-8 w-20 ml-2" placeholder="1 mètre" />
                </div>
                <div className="pb-2">
                    <label htmlFor="status" id="status" >Status :</label>
                    <input type="text" id="status" name="status" className="bg-zinc-200 h-8 w-30 ml-2" placeholder="En fleuraison" />
                </div>
                <div className="pb-2">
                    <label htmlFor="nbrSuivi" id="nbrSuivi" >Numéro de suivi :</label>
                    <input type="nbrSuivi" id="nbrSuivi" name="nbrSuivi" className="bg-zinc-200 h-8 w-22 ml-2" placeholder=" 4321789" />
                </div>
                <div className="pb-2">
                    <label htmlFor="birthday" id="birthday" >Date de plantation :</label>
                    <input type="birthday" id="birthday" name="birthday" className="bg-zinc-200 h-8 w-25 ml-2" placeholder=" 22/07/22" />
                </div>
                <div>
                    <label htmlFor="age" id="age" >Age  :</label>
                    <input type="age" id="age" name="age" className="bg-zinc-200 h-8 w-15 ml-2 mb-2" placeholder=" 2 ans" />
                </div>
                <div className="flex justify-center items-center">
                    <label htmlFor="image" id="image" >Image  :</label>
                    <input type="image" id="image" name="image" className="bg-zinc-200 h-40 w-40 ml-2" src="images/arbres/Acacia.webp" />
                </div>
            </div>
        </div>
    )
}