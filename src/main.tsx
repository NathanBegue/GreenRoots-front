import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import 'izitoast/dist/css/iziToast.min.css';
import { StrictMode } from "react";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
