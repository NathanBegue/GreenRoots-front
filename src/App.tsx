import Index from "./component/pages/Index";
import Page404 from "./component/pages/Page404";
import Boutique from "./component/pages/Boutique";
import Header from "./component/layout/Header";
import BurgerMenu from "./component/layout/Burger-menu";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";

function App() {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <Router>
      <>
        {/* j'ai mis le header ici car il est générique */}
        <Header setIsOpened={setIsOpened} />

        {/* Si isOpened est vrai alors on affiche le BurgerMenu */}
        {isOpened && <BurgerMenu setIsOpened={setIsOpened} isOpened={isOpened} />}

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
