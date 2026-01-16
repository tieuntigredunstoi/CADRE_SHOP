import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initFbclid, trackPageView } from "@/lib/facebookPixel";

/**
 * Hook pour suivre automatiquement les vues de page avec Facebook Pixel
 * et initialiser le fbclid au changement de route
 */
export const useFacebookTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll vers le haut de la page à chaque changement de route
    window.scrollTo(0, 0);

    // Initialiser le fbclid à chaque changement de page
    initFbclid();

    // Attendre un peu pour s'assurer que le DOM est prêt
    // Envoyer PageView avec fbclid après un court délai
    const timer = setTimeout(() => {
      trackPageView();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);
};
