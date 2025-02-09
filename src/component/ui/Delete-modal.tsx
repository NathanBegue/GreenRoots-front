export default function DeleteModal({
    isOpenedDeleteModal,
    setIsOpenedDeleteModal
}: {
    isOpenedDeleteModal: boolean,
    setIsOpenedDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <>
            {/* Overlay qui ferme la modale en cliquant à l'extérieur */}
            {isOpenedDeleteModal && (
                <div
                    className="fixed inset-0 bg-black/50 z-10"
                    onClick={() => setIsOpenedDeleteModal(false)}
                />
            )}

            {/* Modale */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-secondary w-80 p-6 rounded-lg shadow-lg text-white flex flex-col gap-6 z-20">

                {/* Bouton de fermeture */}
                <img
                    onClick={() => setIsOpenedDeleteModal(false)}
                    src="/images/icons/close.svg"
                    alt="Fermer la modale"
                    className="w-6 h-6 invert absolute top-4 right-4 cursor-pointer"
                />

                {/* Texte de confirmation */}
                <h2 className="text-xl font-bold text-center">Supprimer cet article ?</h2>
                <p className="text-center text-gray-300">Cette action est irréversible.</p>

                {/* Boutons d'action */}
                <div className="flex justify-between">
                    <button
                        className="bg-gray-600 px-4 py-2 rounded-lg text-white hover:bg-gray-700 transition"
                        onClick={() => setIsOpenedDeleteModal(false)}
                    >
                        Annuler
                    </button>
                    <button
                        className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </>
    );
}
