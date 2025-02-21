{
    isAdmin ? (
        <div className="flex gap-2 p-2">
            <button onClick={() => {
                console.log('Modifier', article);
                setIsOpenedEditModal && setIsOpenedEditModal(true);
                setSelectedArticle && setSelectedArticle(article);
            }}
                className="p-2 bg-yellow-500 rounded-lg hover:bg-yellow-600 transition md:w-8 lg:w-10 lg:h-12 cursor-pointer hover:scale-110">
                <img src="/images/icons/edit.svg" alt="Modifier" className="w-6 h-6 invert" />
            </button>

            <button onClick={() => {
                console.log('Supprimer', article);
                setIsOpenedDeleteModal && setIsOpenedDeleteModal(true);
                setSelectedArticle && setSelectedArticle(article);
            }}
                className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition lg:w-10 lg:h-12 md:w-8 mr-2 cursor-pointer hover:scale-110">
                <img src="/images/icons/trash.svg" alt="Supprimer" className="w-6 h-6 invert " />
            </button>
        </div>
    ) : null
}