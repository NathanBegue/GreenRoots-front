import { Link } from "react-router";

export default function Panier() {
    return (
        <div className="bg-dark-primary text-white px-6 py-10 w-full h-dvh flex flex-col gap-6">
            <h1 className="text-center">Votre panier</h1>

            {/* block article */}
            <div>

            </div>

            {/* block tota (facture) */}
            <div className="bg-dark-accent p-6  mt-6 flex flex-col gap-6 shadow-lg">
                <div className="flex justify-between">
                    <h2>Total</h2>
                    <p>105.92</p>
                </div>
                <form action="">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="" id="" />
                        <p className="text-center">J'accepte les conditions générales de vente</p>
                    </div>
                    <div className="flex flex-col items-center gap-6 pt-4">
                        <Link to="/cgu" className="">CGU</Link>
                        <button className="bg-cta px-4 py-2 rounded-2xl">Payer</button>
                    </div>
                </form>
            </div>
        </div>
    );
}