import Index from "./component/pages/Index";
import Page404 from "./component/pages/Page404";
import Boutique from "./component/pages/Boutique";
import Header from "./component/layout/Header";
import BurgerMenu from "./component/layout/Burger-menu";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Connexion from "./component/pages/Connexion";
import Inscription from "./component/pages/Insciption";
import Footer from "./component/layout/Footer";
import ConnexionModal from "./component/ui/Connexion-modal";


function App() {
  // State du burger-menu
  const [isOpened, setIsOpened] = useState<boolean>(false);
  // State de la modale de connexion
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  return (
    <Router>
      <>
        {/* Header générique */}
        <Header setIsOpened={setIsOpened} setIsModalOpened={setIsModalOpened} />

        {/* Affichage du BurgerMenu */}
        {isOpened && <BurgerMenu setIsOpened={setIsOpened} isOpened={isOpened} />}

        {/* Affichage de la modale de connexion */}
        {isModalOpened && <ConnexionModal setIsModalOpened={setIsModalOpened} isModalOpened={isModalOpened} />}

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="*" element={<Page404 />} />
        </Routes>

        {/* Footer générique */}
        <Footer />
      </>
    </Router>
  );
}

export default App;
