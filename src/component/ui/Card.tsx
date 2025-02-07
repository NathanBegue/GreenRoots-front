export default function Card() {
    return (
        <article className="bg-dark-secondary text-white  flex flex-col items-center rounded-lg border shadow-black shadow-lg">
            <div>
                <img className="object-cover rounded-t-lg" src="/images/arbres/chene_pedoncule.webp" alt="" />
            </div>
            <div className="flex gap-4">
                <p className="text-xl font-bold p-4 font-title">
                    Chène pédonculé
                </p>
                <div className="flex flex-row items-center bg-cta p-2 rounded-lg">
                    <img src="images/icons/shop-card.svg" alt="Logo panier" className="w-6 h-6 invert" />
                </div>
            </div>
        </article>
    )
}