import Index from "./component/pages/Index";
import Page404 from "./component/pages/Page404";
import Boutique from "./component/pages/Boutique";
import Header from "./component/layout/Header";
import BurgerMenu from "./component/layout/Burger-menu";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Connexion from "./component/pages/Connexion";
import Inscription from "./component/pages/Inscription";
import Footer from "./component/layout/Footer";
import ConnexionModal from "./component/ui/Connexion-modal";
import Panier from "./component/pages/Panier";
import UserSpace from "./component/pages/User-space";
import Page403 from "./component/pages/Page403";
import Cgu from "./component/pages/Cgu";
import SuivisArbresUser from "./component/pages/SuivisArbreUser";
import DetailModal from "./component/ui/Detail-modal";
import { Itrees } from "../type/type";
import FakePayment from "./component/pages/Paiement";
import Historique from "./component/pages/Historique";
import { useLoaderStore } from "./Auth/loaderStore";
import Loader from "./component/layout/Loader";
import ProtectedModal from "./component/ui/ProtectedModal";
import BlocActu from "./component/ui/BlocActu";




function App() {
  // State du burger-menu
  const [isOpened, setIsOpened] = useState<boolean>(false);
  // State de la modale de connexion
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  // State de la modalde de détail d'un arbre
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

  const [selectedArticle, setSelectedArticle] = useState<Itrees | null>(null);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const [isprotectedModal, setIsProtectedModal] = useState<boolean>(false);

  const { isLoading, showLoader, hideLoader } = useLoaderStore();



  useEffect(() => {
    // Simule un chargement initial de l'app
    showLoader();
    setTimeout(() => {
      hideLoader();
    }, 1500); // 1.5 secondes de chargement initial
  }, [showLoader, hideLoader]);



  return (


    <Router>

      {/* Loader Global */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}
      <>
        {/* Header générique */}
        <Header
          setIsOpened={setIsOpened}
          setIsModalOpened={setIsModalOpened}
          setIsDarkMode={setIsDarkMode}
          isDarkMode={isDarkMode}
        />
        {/* Affichage du BurgerMenu */}
        {isOpened && <BurgerMenu setIsOpened={setIsOpened} isOpened={isOpened} isDarkMode={isDarkMode} setIsProtectedModal={setIsProtectedModal} />}

        {/* Affichage de la modale de connexion */}
        {isModalOpened && <ConnexionModal setIsModalOpened={setIsModalOpened} isModalOpened={isModalOpened} isDarkMode={isDarkMode} />}

        {/* Affichage de la modale de détail*/}
        {isOpenDetail && selectedArticle && (<DetailModal
          setIsOpenDetail={setIsOpenDetail}
          article={selectedArticle}
          isDarkMode={isDarkMode} />)}

        {/* Modale conditionelle pour les routes authentifiée */}
        {isprotectedModal && <ProtectedModal isDarkMode={isDarkMode} setIsProtectedModal={setIsProtectedModal} />}



        <Routes>
          <Route path="/" element={<Index setIsOpenDetail={setIsOpenDetail}
            setSelectedArticle={setSelectedArticle}
            isOpenDetail={isOpenDetail}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}


          />} />

          <Route path="/boutique" element={<Boutique
            setIsOpenDetail={setIsOpenDetail}
            setSelectedArticle={setSelectedArticle}
            selectedArticle={selectedArticle}
            isOpenDetail={isOpenDetail}
            isDarkMode={isDarkMode}
          />} />



          <Route path="/panier" element={<Panier isDarkMode={isDarkMode} />} />
          <Route path="/connexion" element={<Connexion isDarkMode={isDarkMode} />} />
          <Route path="/inscription" element={<Inscription isDarkMode={isDarkMode} />} />
          <Route path="/compte" element={<UserSpace isDarkMode={isDarkMode} />} />
          <Route path="/cgu" element={<Cgu isDarkMode={isDarkMode} />} />
          <Route path="/suivis" element={<SuivisArbresUser isDarkMode={isDarkMode} />} />
          <Route path="/historique" element={<Historique isDarkMode={isDarkMode} setIsOpenDetail={setIsOpenDetail} setSelectedArticle={selectedArticle} article={selectedArticle} />} />
          <Route path="/paiement" element={<FakePayment isDarkMode={isDarkMode} />} />
          <Route path="/interdit" element={<Page403 isDarkMode={isDarkMode} />} />
          <Route path="*" element={<Page404 isDarkMode={isDarkMode} />} />
        </Routes>


        {/* Footer générique */}
        <Footer isDarkMode={isDarkMode} />
      </>
    </Router>


  );
}

export default App;
