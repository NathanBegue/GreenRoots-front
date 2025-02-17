import Index from "./component/pages/Index";
import Page404 from "./component/pages/Page404";
import Boutique from "./component/pages/Boutique";
import Header from "./component/layout/Header";
import BurgerMenu from "./component/layout/Burger-menu";
import { useState } from "react";
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


function App() {
  // State du burger-menu
  const [isOpened, setIsOpened] = useState<boolean>(false);
  // State de la modale de connexion
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  // State de la modalde de détail d'un arbre
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

  const [selectedArticle, setSelectedArticle] = useState<Itrees | null>(null);

  return (

    <Router>
      <>
        {/* Header générique */}
        <Header setIsOpened={setIsOpened} setIsModalOpened={setIsModalOpened} />

        {/* Affichage du BurgerMenu */}
        {isOpened && <BurgerMenu setIsOpened={setIsOpened} isOpened={isOpened} />}

        {/* Affichage de la modale de connexion */}
        {isModalOpened && <ConnexionModal setIsModalOpened={setIsModalOpened} isModalOpened={isModalOpened} />}

        {/* Affichage de la modale de détail*/}
        {isOpenDetail && selectedArticle && (<DetailModal setIsOpenDetail={setIsOpenDetail} article={selectedArticle} />)}

        <Routes>
          <Route path="/" element={<Index setIsOpenDetail={setIsOpenDetail} setSelectedArticle={setSelectedArticle} isOpenDetail={isOpenDetail} />} />
          <Route path="/boutique" element={<Boutique setIsOpenDetail={setIsOpenDetail} setSelectedArticle={setSelectedArticle} isOpenDetail={isOpenDetail}  />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/compte" element={<UserSpace />} />
          <Route path="/cgu" element={<Cgu />} />
          <Route path="/suivis" element={<SuivisArbresUser />} />
          <Route path="/interdit" element={<Page403 />} />
          <Route path="*" element={<Page404 />} />
        </Routes>

        {/* Footer générique */}
        <Footer />
      </>
    </Router>

  );
}

export default App;
