
import { Route, Routes } from "react-router";
import Index from "./component/pages/Index";
import Page404 from "./component/pages/Page404";
import Boutique from "./component/pages/Boutique";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/boutique" element={<Boutique />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;
