// imports
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import bgImage from "../../assets/images/404.jpg";



export default function Page404() {
    return (
        <div className="w-full max-w-screen overflow-hidden">
            <Header />
            <main className="text-white flex flex-col gap-6 text-center ">
                <div className="w-screen h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center flex-col">

                        <h1 className="text-white text-8xl font-bold font-title" > 404 </h1>
                        <p className="text-white text-4xl font-bold pt-6 font-content"> Oups, vous vous êtes perdu(e) </p>
                        <p className="pt-20">
                            <a href="" className="font-content "> Retour à l'accueil</a>
                        </p>
                    </div>
                </div>

            </main >
            <Footer />
        </div >
    )
}