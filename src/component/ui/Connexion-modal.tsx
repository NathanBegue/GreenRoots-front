export default function ConnexionModal() {
    return (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-secondary bg-opacity-90 w-64 h-54 p-6 rounded-lg text-center shadow-lg text-white flex flex-col  justify-between items-center gap-4 ">
            <img className="w-8 h-8 invert absolute right-4" src="/images/icons/close.svg" alt="" />
            <div className="flex flex-col gap-2 min-w-34">
                <p className="font-content">Déjà un compte ?</p>
                <a href="#" className="bg-cta py-2 px-4 rounded-sm font-title font-bold">Connexion</a>
            </div>
            <div className="flex flex-col gap-2 min-w-34">
                <p className="font-content">S'enregistrer</p>
                <a href="#" className="bg-cta py-2 px-4 rounded-sm font-title font-bold">S'inscrire</a>
            </div>
        </div>
    );
}
