export default function Card() {
    return (
        <article className="bg-dark-secondary text-white  flex flex-col items-center rounded-lg border shadow-black shadow-lg">
            <div>
                <img className="object-cover rounded-t-lg" src="/images/arbres/chene_pedoncule.webp" alt="" />
            </div>
            <div className="flex">
                <p className="text-xl font-bold p-4 font-title">
                    Chène pédonculé
                </p>
                <img src="images/icons/shop-card.svg" alt="" className="w-8 " />
            </div>
        </article>
    )
}