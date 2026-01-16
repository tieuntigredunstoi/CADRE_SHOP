import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initFbclid, initFacebookPixel } from "./lib/facebookPixel";

// Initialiser le pixel Facebook et le fbclid au chargement de l'application
if (typeof window !== "undefined") {
  // Initialiser le pixel Facebook
  initFacebookPixel();
  // Initialiser le fbclid
  initFbclid();
}

createRoot(document.getElementById("root")!).render(<App />);
