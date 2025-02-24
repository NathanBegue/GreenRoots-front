

export default function NewsBlock({ isDarkMode }: { isDarkMode: boolean }) {
    const news = [
        {
            title: "📢 Nouvelles espèces disponibles !",
            description: "Découvrez de nouvelles variétés d’arbres à parrainer et participez activement à la reforestation.",
        },
        {
            title: "📍 Suivi en temps réel",
            description: "Nos équipes vous donnent des nouvelles régulières sur la croissance de vos arbres et les lieux de plantation.",
        },
        {
            title: "🌍 Engagement écologique",
            description: "Nous collaborons avec des partenaires locaux pour un impact encore plus fort sur l’environnement.",
        },
    ];

    return (
        <div className={`${isDarkMode ? "bg-dark-secondary" : "bg-light-secondary"} p-10 rounded-2xl shadow-xl max-w-7xl mx-auto my-10`}>
            <h2 className={`"text-3xl font-bold text-center ${isDarkMode ? "text-light-primary" : "text-black"} mb-6`}>
                🌱 Nos Dernières Actualités
            </h2>
            <p className="text-center text-gray-1000 mb-10">
                Découvrez les dernières nouvelles sur nos plantations, les évolutions de vos arbres et les initiatives écologiques en cours.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {news.map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
                        <h3 className="text-xl font-semibold text-light-primary mb-2">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                ))}
            </div>

            <p className={`text-center ${isDarkMode ? "text-white" : "text-gray-900"}  mt-8`}>
                🌟 Restez connectés pour ne rien manquer des prochaines initiatives !
            </p>
        </div>
    );
}
