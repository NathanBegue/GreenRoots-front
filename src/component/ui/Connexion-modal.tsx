export default function ConnexionModal() {
    return (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-secondary bg-opacity-90 w-64 h-50 p-4 rounded-lg text-center shadow-lg text-white flex flex-col  justify-between items-center gap-4 ">
            <div className="flex flex-col gap-2 min-w-34">
                <p className="">Déjà un compte ?</p>
                <a href="#" className="bg-cta py-2 px-4">Connexion</a>
            </div>
            <div className="flex flex-col gap-2 min-w-34">
                <p className="">S'enregistrer</p>
                <a href="#" className="bg-cta py-2 px-4">S'inscrire</a>
            </div>
        </div>
    );
}
