import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initFbclid } from "./lib/facebookPixel";

// Initialiser le fbclid au chargement de l'application
if (typeof window !== "undefined") {
  initFbclid();
}

createRoot(document.getElementById("root")!).render(<App />);
